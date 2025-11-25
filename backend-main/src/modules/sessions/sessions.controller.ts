import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SessionsService } from '@/modules/sessions/sessions.service';
import { CreateSessionsDto } from '@/modules/sessions/dto/create-session.dto';
import { UpdateSessionsDto } from '@/modules/sessions/dto/update-session.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) { }

  @Get()
  findAll() {
    return this.sessionsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.sessionsService.findById(id);
  // }

}
