import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CertificatsService } from '@/modules/certificats/certificats.service';
import { CreateCertificatDto } from '@/modules/certificats/dto/create-certificat.dto';
import { UpdateCertificatDto } from '@/modules/certificats/dto/update-certificat.dto';
import { ApiTags, ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('Certificats')
@Controller('certificats')
export class CertificatsController {
  constructor(private readonly certificatsService: CertificatsService) { }


  @Get()
  @ApiOperation({ summary: 'Get all certificates' })
  @ApiOkResponse({ description: 'Certificates retrieved successfully' })
  findAll() {
    return this.certificatsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get certificate by ID' })
  @ApiOkResponse({ description: 'Certificate found' })
  @ApiNotFoundResponse({ description: 'Certificate not found' })
  findOne(@Param('id') id: string) {
    return this.certificatsService.findById(id);
  }

}
