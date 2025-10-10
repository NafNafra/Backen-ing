import { PartialType } from '@nestjs/swagger';
import { CreateSessionsDto } from './create-session.dto';

export class UpdateSessionDto extends PartialType(CreateSessionsDto) {}
