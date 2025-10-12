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

  async update(id: string, updateFormationDto: UpdateFormationDto): Promise<Formation> {
    const updatedFormation = await this.formationModel.findByIdAndUpdate(
      id,
      updateFormationDto,
      { new: true, runValidators: true }, // new : retournes le doc mis à jour
    ).exec();
    if (!updatedFormation) {
      throw new NotFoundException(`Formation avec id="${id}" non trouvé`);
    }
    return updatedFormation;
  }

  async remove(id: string): Promise<void> {
    const formationToDelete = this.formationModel.findByIdAndDelete(id).exec();
    if (!formationToDelete) throw new NotFoundException(`Client avec id=${id} non trouvé`);
  }
}
