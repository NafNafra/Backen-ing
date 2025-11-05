import { OnModuleInit } from '@nestjs/common';
import { ContactToFs } from './dto/contact-to-fs.dto';
import { SmsService } from 'src/commons/providers/sms/sms.service';
export declare class ContactService implements OnModuleInit {
    private readonly smsService;
    private clientFs;
    onModuleInit(): void;
    sendMessageToFsViaMicroservice(name: string): import("rxjs").Observable<any>;
    constructor(smsService: SmsService);
    sendMessageToFs(contactFs: ContactToFs): Promise<{
        message: string;
    }>;
}
