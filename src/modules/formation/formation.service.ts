import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { FormationResponseDto } from './dto/response-formation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Formation, FormationDocument } from './entities/formation.entity';

@Injectable()
export class FormationService {
  constructor(@InjectModel(Formation.name) private formationModel: Model<FormationDocument>) { }

  async create(createFormationDto: CreateFormationDto): Promise<Formation> {
    const formation = new this.formationModel(createFormationDto);
    return formation.save();
  }

  async findAll(): Promise<Formation[]> {
    return this.formationModel.find().exec();
  }

  async findById(id: string): Promise<FormationResponseDto> {
    const formation = await this.formationModel.findOne({ _id: id }).exec()
    if (!formation) throw new NotFoundException("Formation introuvable");
    return new FormationResponseDto(formation);
  }

  update(id: string, updateFormationDto: UpdateFormationDto) {
    return this.formationModel.findByIdAndUpdate({ id, updateFormationDto });
  }

  remove(id: string) {
    return this.formationModel.findByIdAndDelete({ id });
  }
}
