import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { CertificatsService } from '@/modules/certificats/certificats.service';
import { ApiTags, ApiOperation, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { CertificatResponseDto } from './dto/response-certificat.dto';
@ApiTags('Certificats')
@Controller('certificats')
export class CertificatsController {
  constructor(private readonly certificatsService: CertificatsService) { }


  @Get()
  @ApiOperation({ summary: 'Get all certificates' })
  @ApiOkResponse({
    description: 'Certificates retrieved successfully',
    type: [CertificatResponseDto]
  })
  findAll(): Promise<CertificatResponseDto[]> {
    return this.certificatsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get certificate by ID' })
  @ApiOkResponse({
    description: 'Certificate found',
    type: CertificatResponseDto
  })
  @ApiNotFoundResponse({ description: 'Certificate not found' })
  findOne(@Param('id') id: string): Promise<CertificatResponseDto> {
    return this.certificatsService.findById(id);
  }

}
