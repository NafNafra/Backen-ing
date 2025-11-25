import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFormationDto } from '@/modules/formation/dto/create-formation.dto';
import { UpdateFormationDto } from '@/modules/formation/dto/update-formation.dto';
import { Formation, FormationDocument } from '@/modules/formation/entities/formation.entity';
import { FsCertService } from '@/commons/providers/fsback/fs-cert.service';

@Injectable()
export class FormationService {
  constructor(
    private readonly fsFormation: FsCertService,
  ) { }

  // Formation with their programm
  async findById(customerId: string): Promise<Formation[]> {
    const formationProgramm = await this.fsFormation.getCustomerCertDetails(customerId);
    return formationProgramm;
  }

  // async findById(id: string): Promise<FormationResponseDto> {
  //   const formation = await this.formationModel.findOne({ _id: id }).exec();
  //   if (!formation) throw new NotFoundException('Formation introuvable');
  //   return new FormationResponseDto(formation);
  // }


  // async findOneWithSessions(id: string) {
  //   const formationSession = this.formationModel
  //     .findById(id)
  //     .populate('sessions')
  //     .exec();
  //   if (!formationSession)
  //     throw new NotFoundException('Formation with session not found');
  //   return formationSession;
  // }

}
