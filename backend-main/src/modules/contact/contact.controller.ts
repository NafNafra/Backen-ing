import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactToFs } from './dto/contact-to-fs.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) { }

  @Get()
  async greet() {
    const response = await this.contactService.sendMessageToFsViaMicroservice('NestJS');
    return response;
  }

  @Post()
  async messagingFs(@Body() contactFs: ContactToFs) {
    return this.contactService.sendMessageToFs(contactFs);
  }
}
