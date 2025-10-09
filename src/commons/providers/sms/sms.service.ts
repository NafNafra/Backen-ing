import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigsService } from 'src/configs';

@Injectable()
export class SmsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configsService: ConfigsService
  ) { }
  async sendSms(phone: string, message: string) {
    const token = this.configsService.get('sms.token');
    const body = {
      phone: phone,
      message: message
    }
    try {
      // await this.httpService.axiosRef.post('https://fs-pay.atydago.com/api/sms', body, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': token
      //   },
      // })
      console.log(token + " " + body)

    } catch (error) {
      throw new InternalServerErrorException("Une erreur s'est produite lors de l'envoi du message, mais votre compte a été créé. \n Vous pouvez essayer de vous connecter");
    }
  }

  async sendSmsToFs(phone: string, message: string) {
    // const token = this.configsService.get('sms.token');
    const body = {
      phone: phone,
      message: message
    }
    try {
      // await this.httpService.axiosRef.post('https://fs-pay.atydago.com/api/sms', body, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // 'Authorization': token
      //   },
      // })
      console.log(body.message + " to " + phone)

    } catch (error) {
      throw new InternalServerErrorException("Une erreur s'est produite lors de l'envoi du message, mais votre compte a été créé. \n Vous pouvez essayer de vous connecter");
    }
  }
}
