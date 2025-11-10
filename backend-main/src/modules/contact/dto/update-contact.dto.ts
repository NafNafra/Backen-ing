import { PartialType } from '@nestjs/swagger';
import { CreateContactDto } from '@/modules/contact/dto/create-contact.dto';

export class UpdateContactDto extends PartialType(CreateContactDto) {}
