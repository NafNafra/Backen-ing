import {
  Controller,
  Get,
} from '@nestjs/common';
import { SessionsService } from '@/modules/sessions/sessions.service';
import { ApiOkResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { SessionResponseDto } from '@/modules/sessions/dto/response-session.dto';

@ApiTags('Sessions')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) { }

  @Get()
  @ApiOperation({ summary: 'Get all sessions' })
  @ApiOkResponse({
    description: 'Sessions found successfully',
    type: SessionResponseDto,
    isArray: true
  })
  async findAll() : Promise<SessionResponseDto[]> {
    const data = await this.sessionsService.findAll();
    return data.map(item => new SessionResponseDto(item))
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.sessionsService.findById(id);
  // }

}
