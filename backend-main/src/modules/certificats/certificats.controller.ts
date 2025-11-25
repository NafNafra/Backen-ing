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

@Controller('certificats')
export class CertificatsController {
  constructor(private readonly certificatsService: CertificatsService) {}


  @Get()
  findAll() {
    return this.certificatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificatsService.findById(id);
  }


}
