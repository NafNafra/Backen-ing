/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-base-to-string */
import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigsService } from '@/configs';
import { setOtpExpiryTime, generateOtpCode } from '@/commons/utils';
import { FsUrlService } from '@/commons/providers/fs-url/fs-url.service';
import { UsersService } from '@/modules/user/user.service';
import { SmsService } from '@/commons/providers/sms/sms.service';
import { payload } from '@/commons/types/auth';
import { AuthResponse } from '@/modules/auth/dto/response.dto';
import { CreateAuthPhoneDto } from '@/modules/auth/dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly smsService: SmsService,
    private readonly configsService: ConfigsService,
    private readonly jwtService: JwtService,
    private readonly fsService: FsUrlService,
  ) { }

  // Look for user by phone number and send OTP
  async lookByPhone(phoneAuth: string) {
    console.log("Auth : ", phoneAuth)

    console.log( "\n\n\n\n",this.fsService.findUsersByPhone(phoneAuth));
    // const users = await this.usersService.findByPhone(phoneAuth : CreateAuthPhoneDto);
    // if (!users || users.length === 0) {
    //   throw new NotFoundException(`User with phone ${phoneAuth}+ found`);
    // }

    const OtpCode = generateOtpCode();
    const OtpExpiresAt = setOtpExpiryTime();

    // for (const user of users) {
    //   user._OtpCode = OtpCode;
    //   user._OtpExpiresAt = OtpExpiresAt;
    //   await user.save();
    // }

    await this.smsService.sendSms(
      phoneAuth.toString(),
      `Votre code de vérification est: ${OtpCode}`,
    );

    return {
      message: `Le code de vérification a été envoyé au numéro: ${phoneAuth}. Le code ${OtpCode} expirera dans 10 minutes `,
    };
  }

  // Verify OTP code
  async verifyOtp(
    phoneAuth: CreateAuthPhoneDto,
    code: string,
  ): Promise<AuthResponse> {
    const users = await this.usersService.findByPhone(phoneAuth);
    if (!users) {
      throw new NotFoundException(`User with phone ${phoneAuth} not found`);
    }

    const validOtpUser = users.find(
      (u) =>
        u._OtpCode === code &&
        new Date(u._OtpExpiresAt).getTime() > Date.now(),
    );

    if (!validOtpUser) {
      throw new BadRequestException('Code OTP invalide ou expiré');
    }

    for (const u of users) {
      u._OtpCode = '';
      u._OtpExpiresAt = '';
      await u.save();
    }

    return {
      message: `Code vérifié. Sélectionnez l'utilisateur à connecter. `,
      user: users.map((u) => ({
        id: u._id,
        name: u.name,
        phoneNumber: u.phoneNumber,
        activated: u.activated,
      })),
      statusCode: HttpStatus.OK
    }
  }

  // Reenvoyer le code
  async resendCode(phoneAuth: CreateAuthPhoneDto) {
    const users = await this.usersService.findByPhone(phoneAuth);
    if (!users || users.length === 0) {
      throw new NotFoundException(`User with phone ${phoneAuth} not found`);
    }

    for (const user of users) {
      user._OtpCode = '';
      user._OtpExpiresAt = '';
      await user.save();
    }
    // return this.lookByPhone(phoneAuth);
  }

  // Se connecter a un utilisateur
  async loginChosenUser(userId: Types.ObjectId, phoneNumber: CreateAuthPhoneDto): Promise<AuthResponse> {
    const users = await this.usersService.findByPhone(phoneNumber);
    if (!users) {
      throw new NotFoundException(`User with phone ${phoneNumber} not found`);
    }
    const validOtpUser = users.find(
      (u) => {
        if (u._id === userId) {
          return u
        }
      });

    if (!validOtpUser) {
      throw new NotFoundException('Utilisateur non validé');
    }
    validOtpUser.activated = true;
    await validOtpUser.save()

    const user = await this.usersService.findById(userId);
    const payload: payload = {
      id: user.id,
      phone: user.phoneNumber,
      activated: user.activated,
    };

    const token = await this.generateTokens(payload);
    await this.storeRefreshToken(user.id.toString(), token.refresh_token);

    return {
      user: [{
        id: user.id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        activated: user.activated
      }],
      message: 'Connexion réussie',
      statusCode: HttpStatus.OK,
      accessToken: token.access_token,
      refreshToken: token.refresh_token,
    };
  }


  async logout(userId: string): Promise<void> {
    await this.usersService.update(userId, { refreshToken: null, activated: false });
  }

  async generateTokens(
    payload: payload,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const access_token = await this.jwtService.signAsync(payload, {
      secret: this.configsService.get('jwt.secret'),
      expiresIn: this.configsService.get('jwt.expiresIn'),
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configsService.get('jwt.refresh.secret'),
      expiresIn: this.configsService.get('jwt.refresh.expiresIn'),
    });

    return { access_token, refresh_token };
  }

  private async storeRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const hashedToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.update(userId, { refreshToken: hashedToken, activated: true });
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ access_token: string }> {
    const payload = this.jwtService.verify(refreshToken, {
      secret: this.configsService.get('jwt.refresh.secret'),
    });

    const user = await this.usersService.findById(payload.id);

    if (!user || !user.refreshToken)
      throw new UnauthorizedException('Invalid refresh token ko');

    const isTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isTokenValid) throw new UnauthorizedException('Invalid refresh token');

    const newAccessToken = await this.jwtService.signAsync(
      { id: user.id, phoneNumber: user.phoneNumber, activated: user.activated },
      {
        secret: this.configsService.get('jwt.secret'),
        expiresIn: this.configsService.get('jwt.expiresIn'),
      },
    );
    return { access_token: newAccessToken };
  }
}
