import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientsService } from '../clients/clients.service';
import { set2FaExpiryTime, generate2FaCode } from 'src/commons/utils';
import { SmsService } from 'src/commons/providers/sms/sms.service';
import { ConfigsService } from 'src/configs';
import { payload, phonePayload } from 'src/commons/types/auth';
import * as bcrypt from 'bcrypt';
import { access } from 'fs';

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

    if (!user) throw new NotFoundException(`Client with phone ${phone} not found`);

    user._2faCode = generate2FaCode();
    user._2faExpiresAt = set2FaExpiryTime();
    await user.save();

    //send messega to client here
    // await this.smsService.sendSms(user.phoneNumber, `Votre code de vérification est: ${user._2faCode}`);

    return {
      message: `Le code de vérification a été envoyé au numéro: ${phone}. Le code expirera dans 10 minutes ${user._2faCode}`,
    };
  }

  async verify2Fa(phone: string, code: string) {
    const user = await this.clientsService.findByPhone(phone);

    if (!user) throw new NotFoundException(`Client with phone ${phone} not found`);

    if (user._2faCode !== code || new Date() > new Date(user._2faExpiresAt))
      throw new BadRequestException("Le code est invalide ou a expirer");

    user._2faCode = '';
    user._2faExpiresAt = '';
    user.activated = true;
    await user.save();

    const payload: payload = {
      id: user._id,
      phone: user.phoneNumber,
      activated: user.activated
    }

    const token = await this.generateTokens(payload)
    return {
      user: { id: user._id, phoneNumber: user.phoneNumber },
      message: "Connexion avec succes",
      statusCode: HttpStatus.OK,
      accessToken: token.access_token,
      refreshToken: token.refresh_token,
    }
  }

  async resendCode(phone: string) {
    const user = await this.clientsService.findByPhone(phone);
    if (!user) throw new NotFoundException(`Client with phone ${phone} not found`);
    user._2faCode = ''; user._2faExpiresAt = '';
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

}
