import { HttpService } from '@nestjs/axios';
import { ConfigsService } from 'src/configs';
export declare class SmsService {
    private readonly httpService;
    private readonly configsService;
    constructor(httpService: HttpService, configsService: ConfigsService);
    sendSms(phone: string, message: string): void;
    sendSmsToFs(phone: string, message: string): void;
}
