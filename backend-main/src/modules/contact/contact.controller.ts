import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactService } from '@/modules/contact/contact.service';
import { ContactToFs } from '@/modules/contact/dto/contact-to-fs.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  greet() {
    const response =
      this.contactService.sendMessageToFsViaMicroservice('NestJS');
    return response;
  }

  @Post()
  async messagingFs(@Body() contactFs: ContactToFs) {
    return this.contactService.sendMessageToFs(contactFs);
  }
}
