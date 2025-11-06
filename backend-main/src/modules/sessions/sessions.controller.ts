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
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  create(@Body() createSessionDto: CreateSessionsDto) {
    return this.sessionsService.create(createSessionDto);
  }

  @Get()
  findAll() {
    return this.sessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionsDto) {
    return this.sessionsService.update(id, updateSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.sessionsService.remove(id);
  }
}
