import { PartialType } from '@nestjs/swagger';
import { CreateAuthPhoneDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthPhoneDto) {}
