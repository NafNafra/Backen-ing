import { Sessions } from '@/modules/sessions/entities/session.entity';
import { Types } from 'mongoose';

export class ResponseSessionsDto {
  constructor(sessions: Sessions) {
    this.id = sessions._id;
    this.dateDebut = sessions.dateDebut;
    this.dateFin = sessions.dateFin;
    this.nombrePlace = sessions.nombrePlace;
    this.creationDate = sessions.creationDate;
    this.formationId = sessions.formationId;
  }
  id?: string;

  dateDebut?: Date;

  dateFin?: Date;

  nombrePlace?: number;

  creationDate?: Date;

  formationId?: Types.ObjectId;
}
