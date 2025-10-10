import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactToFs } from './dto/contact-to-fs.dto';
import { SmsService } from 'src/commons/providers/sms/sms.service';

@Injectable()
export class ContactService {
  constructor(private readonly smsService: SmsService) { }

  async sendMessageToFs(contactFs: ContactToFs) {
    const { nom, numero, message } = contactFs;
    const contenu = `Message venant de ${nom} avec numero ${numero}\n\"${message}\"`
    await this.smsService.sendSmsToFs(numero, contenu)
    return {
      message:"Message envoyee a FS avec success"
    }
  }

}
