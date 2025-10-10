import { Injectable } from '@nestjs/common';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FormationModule } from './formation.module';
import { Formation, FormationDocument } from './entities/formation.entity';

@Injectable()
export class FormationService {
  constructor(@InjectModel(Formation.name) private formationModel: Model<FormationDocument>) { }

  create(createFormationDto: CreateFormationDto) {
    const formation = new this.formationModel(createFormationDto);
    return formation.save();
  }

  findAll() {
    return `This action returns all formation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} formation`;
  }

  update(id: number, updateFormationDto: UpdateFormationDto) {
    return `This action updates a #${id} formation`;
  }

  remove(id: number) {
    return `This action removes a #${id} formation`;
  }
}
