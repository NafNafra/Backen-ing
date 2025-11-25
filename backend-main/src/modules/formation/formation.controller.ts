import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FormationService } from '@/modules/formation/formation.service';
import { CreateFormationDto } from '@/modules/formation/dto/create-formation.dto';
import { UpdateFormationDto } from '@/modules/formation/dto/update-formation.dto';
import { Formation } from '@/modules/formation/entities/formation.entity';

@Controller('formation')
export class FormationController {
  constructor(private readonly formationService: FormationService) { }

  // @Post()
  // create(@Body() createFormationDto: CreateFormationDto) {
  //   return this.formationService.create(createFormationDto);
  // }

  @Get(':id')
  findById(@Param('id') id: string) { //2263
    return this.formationService.findById(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.formationService.findById(id);
  // }


  // @Get('oneSession')
  // async findOneWithSessions(@Param('id') id: string) {
  //   return this.formationService.findOneWithSessions(id);
  // }
}
