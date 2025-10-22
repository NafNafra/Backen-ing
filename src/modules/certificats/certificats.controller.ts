import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CertificatsService } from './certificats.service';
import { CreateCertificatDto } from './dto/create-certificat.dto';
import { UpdateCertificatDto } from './dto/update-certificat.dto';

@Controller('certificats')
export class CertificatsController {
  constructor(private readonly certificatsService: CertificatsService) { }

  @Post()
  create(@Body() createCertificatDto: CreateCertificatDto) {
    return this.certificatsService.create(createCertificatDto);
  }

  @Get()
  findAll() {
    return this.certificatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificatsService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCertificatDto: UpdateCertificatDto) {
    return this.certificatsService.update(id, updateCertificatDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.certificatsService.remove(id);
  }
}
