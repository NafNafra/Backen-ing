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
import { FsCustomerService } from '@/commons/providers/fsback/fs-customer.service';
import { UsersService } from '@/modules/user/user.service';
import { SmsService } from '@/commons/providers/sms/sms.service';
import { payload } from '@/commons/types/auth';
import { AuthResponse } from '@/modules/auth/dto/response.dto';
import { CreateAuthPhoneDto } from '@/modules/auth/dto/create-auth.dto';
import { UserResponseDto } from '@/modules/user/dto/response-user.dto';
import { LoginChosenUserDto } from '@/modules/auth/dto/login-chosen-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly smsService: SmsService,
    private readonly configsService: ConfigsService,
    private readonly jwtService: JwtService,
    private readonly fsService: FsCustomerService,
  ) { }

  // Look for user by phone number and send OTP
  async lookByPhone(phoneAuth: CreateAuthPhoneDto) {
    const savedUsers = await this.usersService.findAndSyncExternalUsers(phoneAuth);

    const OtpCode = generateOtpCode();
    const OtpExpiresAt = setOtpExpiryTime();

    for (const user of savedUsers) {
      await this.usersService.updateOtp(user.idUser, OtpCode, OtpExpiresAt);
    }
    await this.smsService.sendSms(
      phoneAuth.toString(),
      `Votre code de vérification est: ${OtpCode}`,
    );

    return {
      message: `Le code de vérification a été envoyé au numéro: ${phoneAuth}. Le code ${OtpCode} expirera dans 10 minutes.`,
    };
  }

  // Verify OTP code
  async verifyOtp(
    phoneAuth: CreateAuthPhoneDto,
    code: string,
  ): Promise<AuthResponse> {
    const users = await this.usersService.findByPhone(phoneAuth);
    if (!users || users.length === 0) {
      throw new NotFoundException(`User with phone ${phoneAuth} not found`);
    }
    console.log(users);
    const validOtpUser = users.find(
      (u) => u._OtpCode === code && u._OtpExpiresAt !== undefined &&
        new Date(u._OtpExpiresAt).getTime() > Date.now()
    );

    if (!validOtpUser) {
      throw new BadRequestException('Code OTP invalide ou expiré');
    }

    for (const u of users) {
      // console.log(u._id, u)
      u._OtpCode = '';
      u._OtpExpiresAt = undefined;
      await u.save();
    }



    return {
      message: `Code vérifié. Sélectionnez l'utilisateur à connecter. `,
      user: users.map((u) => ({
        id: u._id,
        name: u.name,
        compteFb: u.compteFb,
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
      user._OtpExpiresAt = undefined;
      await user.save();
    }

    const OtpCode = generateOtpCode();
    const OtpExpiresAt = setOtpExpiryTime();

    for (const user of users) {
      await this.usersService.updateOtp(user.idUser, OtpCode, OtpExpiresAt);
    }

    await this.smsService.sendSms(
      phoneAuth.toString(),
      `Votre code de vérification est: ${OtpCode}`,
    );

    return {
      message: `Le code de vérification a été envoyé au numéro: ${phoneAuth}. Le code ${OtpCode} expirera dans 10 minutes.`,
    };

  }

  // Se connecter a un utilisateur
  async loginChosenUser(student: LoginChosenUserDto) {
    console.log(student)
    console.log(student.phone)
    const users = await this.usersService.findByPhone(student.phone); //
    if (!users) {
      throw new NotFoundException(`User with phone ${student.phone} not found`);
    }
    const validOtpUser = users.find(
      (u) => {
        console.log("Gahem : ", u._id.toString(), student.id.toString(), student.phone, u.phoneNumber);
        if (u._id && student.id && u._id.toString() === student.id.toString()) {
          console.log(`Equals  // \n ${u}`)
          return u
        }
        else {
          console.log("Nope  //")
        }
      });

    if (!validOtpUser) {
      throw new NotFoundException('Utilisateur non validé');
    }
    validOtpUser.activated = true;
    await validOtpUser.save()
    console.log('validOtpUser : ', validOtpUser);

    // const user = await this.usersService.findById(validOtpUser._id);
    // console.log(`User by id \n ${user}`)

    const payload: payload = {
      id: validOtpUser._id,
      phone: validOtpUser.phoneNumber,
      activated: validOtpUser.activated,
    };

    console.log(payload);

    const token = await this.generateTokens(payload);
    await this.storeRefreshToken(validOtpUser._id, token.refresh_token);

    return {
      user: [{
        id: validOtpUser._id,
        name: validOtpUser.name,
        phoneNumber: validOtpUser.phoneNumber,
        activated: validOtpUser.activated
      }],
      message: 'Connexion réussie',
      statusCode: HttpStatus.OK,
      accessToken: token.access_token,
      refreshToken: token.refresh_token,
    };
  }


  async logout(userId: Types.ObjectId): Promise<void> {
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
    userId: Types.ObjectId,
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
      { id: user._id, phoneNumber: user.phoneNumber, activated: user.activated },
      {
        secret: this.configsService.get('jwt.secret'),
        expiresIn: this.configsService.get('jwt.expiresIn'),
      },
    );
    return { access_token: newAccessToken };
  }
}
