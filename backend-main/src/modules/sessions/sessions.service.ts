/* eslint-disable @typescript-eslint/no-misused-promises */
import { Injectable } from '@nestjs/common';
import { Sessions } from '@/modules/sessions/entities/session.entity';
import { FsFormationService } from '@/commons/providers/fsback/fs-formation.service';
@Injectable()
export class SessionsService {
  constructor(
    private readonly fsFormation: FsFormationService,
  ) { }

  async findAll(): Promise<Sessions[]> {
    return await this.fsFormation.getAllSessions();
  }

  // async findById(id: string): Promise<ResponseSessionsDto> {
  //   const sessions = await this.sessionsModel.findOne({ _id: id }).exec();
  //   if (!sessions) throw new NotFoundException('Sessions introuvable');
  //   return new ResponseSessionsDto(sessions);
  // }

}
