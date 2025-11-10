import { Sessions } from '@/modules/sessions/entities/session.entity';
import { Types } from 'mongoose';
export declare class ResponseSessionsDto {
    constructor(sessions: Sessions);
    id?: string;
    dateDebut?: Date;
    dateFin?: Date;
    nombrePlace?: number;
    creationDate?: Date;
    formationId?: Types.ObjectId;
}
