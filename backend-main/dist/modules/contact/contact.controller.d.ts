import { ContactService } from './contact.service';
import { ContactToFs } from './dto/contact-to-fs.dto';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    greet(): import("rxjs").Observable<any>;
    messagingFs(contactFs: ContactToFs): Promise<{
        message: string;
    }>;
}
