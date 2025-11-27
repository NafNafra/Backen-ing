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
import { LoginResponseDto, MessageResponseDto, VerifyCodeResponseDto } from '@/modules/auth/dto/response.dto';
import { CreateAuthPhoneDto, TokenDto, VerifingCodeDto } from '@/modules/auth/dto/create-auth.dto';
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
  async lookByPhone(phoneNumber: CreateAuthPhoneDto): Promise<MessageResponseDto> {
    const savedUsers = await this.usersService.findAndSyncExternalUsers(phoneNumber);

    const OtpCode = generateOtpCode();
    const OtpExpiresAt = setOtpExpiryTime();

    for (const user of savedUsers) {
      await this.usersService.updateOtp(user.idUser, OtpCode, OtpExpiresAt);
    }
    await this.smsService.sendSms(
      phoneNumber.phoneNumber,
      `Votre code de vérification est: ${OtpCode}`,
    );

    return new MessageResponseDto(
      `Le code de vérification a été envoyé au numéro: ${phoneNumber.phoneNumber}. Le code ${OtpCode} expirera dans 10 minutes.`,
    );
  }

  // Verify OTP code
  async verifyOtp(
    dto: VerifingCodeDto,
  ): Promise<VerifyCodeResponseDto> {
    const { phoneNumber, code } = dto;
    const users = await this.usersService.findByPhone(phoneNumber);
    if (!users || users.length === 0) {
      throw new NotFoundException(`User with phone ${phoneNumber} not found`);
    }
    const validOtpUser = users.find(
      (u) =>
        u._OtpCode === code &&
        u._OtpExpiresAt !== undefined &&
        new Date(u._OtpExpiresAt).getTime() > Date.now()
    );

    if (!validOtpUser) {
      throw new BadRequestException('Code OTP invalide ou expiré');
    }

    for (const u of users) {
      u._OtpCode = '';
      u._OtpExpiresAt = undefined;
      await u.save();
    }

    return new VerifyCodeResponseDto({
      message: `Code vérifié. Sélectionnez l'utilisateur à connecter. `,
      user: users.map((u) => ({
        _id: u._id.toString(),
        name: u.name,
        compteFb: u.compteFb,
        phoneNumber: u.phoneNumber,
        activated: u.activated,
      })),
      statusCode: HttpStatus.OK
    })
  }

  // Reenvoyer le code
  async resendCode(phoneNumber: CreateAuthPhoneDto): Promise<MessageResponseDto> {
    const users = await this.usersService.findByPhone(phoneNumber.phoneNumber);
    if (!users || users.length === 0) {
      throw new NotFoundException(`User with phone ${phoneNumber.phoneNumber} not found`);
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
      phoneNumber.phoneNumber,
      `Votre code de vérification est: ${OtpCode}`,
    );

    return new MessageResponseDto(
      `Le code de vérification a été envoyé au numéro: ${phoneNumber.phoneNumber}. Le code ${OtpCode} expirera dans 10 minutes.`,
    );
  }

  // Se connecter a un utilisateur
  async loginChosenUser(
    student: LoginChosenUserDto
  ): Promise<LoginResponseDto> {
    const users = await this.usersService.findByPhone(student.phone);
    if (!users) {
      throw new NotFoundException(`User with phone ${student.phone} not found`);
    }
    const validOtpUser = users.find(
      (u) => {
        if (u._id && student._id && u._id.toString() === student._id) {
          return u
        }
        else {
          console.log("Identification invalid ")
        }
      });

    if (!validOtpUser) {
      throw new NotFoundException('Utilisateur non validé');
    }
    validOtpUser.activated = true;
    await validOtpUser.save()

    const payload: payload = {
      _id: validOtpUser._id,
      phoneNumber: validOtpUser.phoneNumber,
      activated: validOtpUser.activated
    };

    const token = await this.generateTokens(payload);
    await this.storeRefreshToken(validOtpUser._id, token.refresh_token);

    return new LoginResponseDto({
      message: 'Connexion réussie',
      user: {
        _id: validOtpUser._id.toString(),
        name: validOtpUser.name,
        phoneNumber: validOtpUser.phoneNumber,
        compteFb: validOtpUser.compteFb,
        activated: validOtpUser.activated
      },
      statusCode: HttpStatus.OK,
      accessToken: token.access_token,
      refreshToken: token.refresh_token,
    });
  }


  async logout(dto: string): Promise<MessageResponseDto> {
    await this.usersService.update(
      dto,
      { refreshToken: null, activated: false }
    );

    return new MessageResponseDto('Déconnexion réussie')
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
    await this.usersService.update(userId.toString(), { refreshToken: hashedToken, activated: true });
  }

  async refreshAccessToken(
    refreshToken: TokenDto,
  ): Promise<TokenDto> {
    console.log(refreshToken)
    const payload = this.jwtService.verify(refreshToken.token, {
      secret: this.configsService.get('jwt.refresh.secret'),
    });

    const user = await this.usersService.findById(payload._id);

    if (!user || !user.refreshToken)
      throw new UnauthorizedException('Invalid refresh token ko');

    const isTokenValid = await bcrypt.compare(refreshToken.token, user.refreshToken);
    if (!isTokenValid) throw new UnauthorizedException('Invalid refresh token');

    const newAccessToken = await this.jwtService.signAsync(
      {
        id: user._id,
        phoneNumber: user.phoneNumber,
        activated: user.activated
      },
      {
        secret: this.configsService.get('jwt.secret'),
        expiresIn: this.configsService.get('jwt.expiresIn'),
      },
    );
    return new TokenDto({ token: newAccessToken });
  }
}
