import { BadRequestException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientsService } from '../clients/clients.service';
import { setOtpExpiryTime, generateOtpCode } from 'src/commons/utils';
import { SmsService } from 'src/commons/providers/sms/sms.service';
import { ConfigsService } from 'src/configs';
import { payload, phonePayload } from 'src/commons/types/auth';
import * as bcrypt from 'bcrypt';
import { AuthResponse } from './dto/response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly smsService: SmsService,
    private readonly configsService: ConfigsService,
    private readonly jwtService: JwtService,
  ) { }

  async connexionClient(phone: string) {
    const user = await this.clientsService.findByPhone(phone);
    if (!user) { throw new NotFoundException(`Client with phone ${phone} not found`); }
    user._OtpCode = generateOtpCode();
    user._OtpExpiresAt = setOtpExpiryTime();
    await user.save();

    //send message to client here
    await this.smsService.sendSms(user.phoneNumber, `Votre code de vérification est: ${user._OtpCode}`);
    return {
      message: `Le code de vérification a été envoyé au numéro: ${phone}. Le code ${user._OtpCode} expirera dans 10 minutes `,
    };
  }

  async verifyOtp(phone: string, code: string): Promise<AuthResponse> {
    const user = await this.clientsService.findByPhone(phone);

    if (!user) throw new NotFoundException(`Client with phone ${phone} not found`);

    console.log(user._OtpCode + " " + code);
    if (user._OtpCode !== code || new Date() > new Date(user._OtpExpiresAt))
      throw new BadRequestException("Le code est invalide ou a expirer");

    user._OtpCode = '';
    user._OtpExpiresAt = '';
    user.activated = true;
    await user.save();

    const payload: payload = {
      id: user._id,
      phone: user.phoneNumber,
      activated: user.activated
    }

    const token = await this.generateTokens(payload)
    await this.storeRefreshToken(user._id, token.refresh_token);

    return {
      user: { name: user.name, phoneNumber: user.phoneNumber },
      message: "Connexion avec succes",
      statusCode: HttpStatus.OK,
      accessToken: token.access_token,
      refreshToken: token.refresh_token,
    }
  }

  async resendCode(phone: string) {
    const user = await this.clientsService.findByPhone(phone);
    if (!user) throw new NotFoundException(`Client with phone ${phone} not found`);
    user._OtpCode = ''; user._OtpExpiresAt = '';
    return this.connexionClient(phone);

  }


  async generateTokens(payload: payload): Promise<{ access_token: string; refresh_token: string }> {
    const access_token = await this.jwtService.signAsync(payload, {
      secret: this.configsService.get("jwt.secret"),
      expiresIn: this.configsService.get('jwt.expiresIn')
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configsService.get("jwt.refresh.secrect"),
      expiresIn: this.configsService.get("jwt.refresh.expiresIn")
    });

    return { access_token, refresh_token };
  }



  private async storeRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const hashedToken = await bcrypt.hash(refreshToken, 10);
    await this.clientsService.update(userId, { refreshToken: hashedToken });
  }

  async refreshAccessToken(refreshToken: string): Promise<{ access_token: string }> {

    const payload = this.jwtService.verify(refreshToken, { secret: this.configsService.get('jwt.refresh.secrect') });
    const user = await this.clientsService.findById(payload.id);

    if (!user || !user.refreshToken) throw new UnauthorizedException("Invalid refresh token");

    const isTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isTokenValid) throw new UnauthorizedException("Invalid refresh token");

    const newAccessToken = await this.jwtService.signAsync(
      { id: user.id, phoneNumber: user.phoneNumber, activated: user.activated },
      { secret: this.configsService.get("jwt.secret"), expiresIn: this.configsService.get('jwt.expiresIn') }
    );

    return { access_token: newAccessToken };
  }

  async logout(userId: string): Promise<void> {
    await this.clientsService.update(userId, { refreshToken: null });
  }

}
