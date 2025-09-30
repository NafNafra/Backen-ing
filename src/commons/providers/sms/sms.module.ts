import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SmsService } from './sms.service';
import { ConfigsModule } from 'src/configs';

@Module({
  imports: [
    HttpModule,
    ConfigsModule
  ],
  providers: [SmsService],
  exports: [SmsService]
})
export class SmsModule { }


/**
 * 
 * import { ConfigsService } from "@cpr_configs";
import { HttpService } from "@nestjs/axios";
import { Injectable, InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class SmsServiceProvider {
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
            await this.httpService.axiosRef.post('https://fs-pay.atydago.com/api/sms', body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })

        } catch (error) {
            throw new InternalServerErrorException("Une erreur s'est produite lors de l'envoi du message, mais votre compte a été créé. \n Vous pouvez essayer de vous connecter");
        }
    }
}
 */