import { ContactToFs } from './dto/contact-to-fs.dto';
import { SmsService } from 'src/commons/providers/sms/sms.service';
export declare class ContactService {
    private readonly smsService;
    constructor(smsService: SmsService);
    sendMessageToFs(contactFs: ContactToFs): Promise<{
        message: string;
    }>;
}
