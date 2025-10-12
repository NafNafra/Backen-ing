import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormationService } from './formation.service';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { Formation } from './entities/formation.entity';

@Controller('formation')
export class FormationController {
  constructor(private readonly formationService: FormationService) { }

  @Post()
  create(@Body() createFormationDto: CreateFormationDto) {
    return this.formationService.create(createFormationDto);
  }

  @Get()
  findAll() {
    return this.formationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formationService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormationDto: UpdateFormationDto) {
    return this.formationService.update(id, updateFormationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.formationService.remove(id);
  }

  @Get('oneSession')
  async findOneWithSessions(@Param('id') id: string) {
    return this.formationService.findOneWithSessions(id)
  }

  @Get('allSessions')
  async listAll(): Promise<Formation[]> {
    return this.formationService.findAllWithSessions();
  }
}
