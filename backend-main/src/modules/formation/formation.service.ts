import { Injectable } from '@nestjs/common';
import { FsFormationService } from '@/commons/providers/fsback/fs-formation.service';
import { FormationResponseDto } from './dto/response-formation.dto';

@Injectable()
export class FormationService {
  constructor(
    private readonly fsCert: FsFormationService,
  ) { }


  async findById(formationId: string): Promise<FormationResponseDto> {
    return await this.fsCert.getFormationById(formationId);
  }

}
