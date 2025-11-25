import { Injectable } from '@nestjs/common';
import { Formation } from '@/modules/formation/entities/formation.entity';
import { FsFormationService } from '@/commons/providers/fsback/fs-formation.service';

@Injectable()
export class FormationService {
  constructor(
    private readonly fsCert: FsFormationService,
  ) { }

  // async create(createFormationDto: CreateFormationDto): Promise<Formation> {
  //   const formation = new this.formationModel(createFormationDto);
  //   return formation.save();
  // }

  async findById(formationId: string): Promise<Formation[]> {
    const formationProgramm = await this.fsCert.getFormationById(formationId);
    return formationProgramm;
  }

  // async findById(id: string): Promise<FormationResponseDto> {
  //   const formation = await this.formationModel.findOne({ _id: id }).exec();
  //   if (!formation) throw new NotFoundException('Formation introuvable');
  //   return new FormationResponseDto(formation);
  // }
}
