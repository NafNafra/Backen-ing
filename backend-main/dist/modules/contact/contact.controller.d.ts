import { ContactService } from './contact.service';
import { ContactToFs } from './dto/contact-to-fs.dto';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    messagingFs(contactFs: ContactToFs): Promise<{
        message: string;
    }>;
}
