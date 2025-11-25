import {
  Controller,
  Get,
  Param,
  NotFoundException
} from '@nestjs/common';
import { FormationService } from '@/modules/formation/formation.service';
import { ApiTags, ApiOperation, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { FormationResponseDto } from './dto/response-formation.dto';

@ApiTags('Formation')
@Controller('formation')
export class FormationController {
  constructor(private readonly formationService: FormationService) { }

  @Get(':id')
  @ApiOperation({ summary: 'Get formation by ID' })
  @ApiOkResponse({
    description: 'Formation found',
    type: FormationResponseDto
  })
  @ApiNotFoundResponse({ description: 'Formation not found' })
  async findById(@Param('id') id: string): Promise<FormationResponseDto> {
    const data = await this.formationService.findById(id);
    if (!data) {
      throw new NotFoundException('Formation not found');
    }
    return new FormationResponseDto(data)
  }

}
