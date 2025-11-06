import { PartialType } from '@nestjs/swagger';
import { CreateAuthPhoneDto } from '@/modules/auth/dto/create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthPhoneDto) {}
