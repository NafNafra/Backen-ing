import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFormationDto } from '@/modules/formation/dto/create-formation.dto';
import { UpdateFormationDto } from '@/modules/formation/dto/update-formation.dto';
import { FormationResponseDto } from '@/modules/formation/dto/response-formation.dto';
import { Formation, FormationDocument } from '@/modules/formation/entities/formation.entity';

@Injectable()
export class FormationService {
  constructor(
    @InjectModel(Formation.name)
    private formationModel: Model<FormationDocument>,
  ) { }

  async create(createFormationDto: CreateFormationDto): Promise<Formation> {
    const formation = new this.formationModel(createFormationDto);
    return formation.save();
  }

  async findAll(): Promise<Formation[]> {
    return this.formationModel.find().exec();
  }

  async findById(id: string): Promise<FormationResponseDto> {
    const formation = await this.formationModel.findOne({ _id: id }).exec();
    if (!formation) throw new NotFoundException('Formation introuvable');
    return new FormationResponseDto(formation);
  }

  async update(
    id: string,
    updateFormationDto: UpdateFormationDto,
  ): Promise<Formation> {
    const updatedFormation = await this.formationModel
      .findByIdAndUpdate(
        id,
        updateFormationDto,
        { new: true, runValidators: true }, // new : retournes le doc mis à jour
      )
      .exec();
    if (!updatedFormation) {
      throw new NotFoundException(`Formation avec id="${id}" non trouvé`);
    }
    return updatedFormation;
  }

  remove(id: string): void {
    const formationToDelete = this.formationModel.findByIdAndDelete(id).exec();
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (!formationToDelete)
      throw new NotFoundException(`Formation avec id=${id} non trouvé`);
  }

  async findOneWithSessions(id: string) {
    const formationSession = this.formationModel
      .findById(id)
      .populate('sessions')
      .exec();
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (!formationSession)
      throw new NotFoundException('Formation with session not found');
    return formationSession;
  }

  async findAllWithSessions(): Promise<Formation[]> {
    return this.formationModel
      .find()
      .populate('sessions') // peupler champ virtuel sessions
      .exec();
  }
}
