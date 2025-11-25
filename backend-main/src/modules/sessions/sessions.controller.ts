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
import { ApiOkResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('sessions')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) { }

  @Get()
  @ApiOperation({ summary: 'Get all sessions' })
  @ApiOkResponse({ description: 'Sessions found successfully' })
  findAll() {
    return this.sessionsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.sessionsService.findById(id);
  // }

}
