import { CreateSessionsDto } from './dto/create-session.dto';
import { UpdateSessionsDto } from './dto/update-session.dto';
import { ResponseSessionsDto } from './dto/response-sessions.dto';
import { Sessions, SessionsDocument } from './entities/session.entity';
import { Model } from 'mongoose';
export declare class SessionsService {
    private sessionsModel;
    constructor(sessionsModel: Model<SessionsDocument>);
    create(createSessionsDto: CreateSessionsDto): Promise<Sessions>;
    findAll(): Promise<Sessions[]>;
    findById(id: string): Promise<ResponseSessionsDto>;
    update(id: string, updateSessionsDto: UpdateSessionsDto): Promise<Sessions>;
    remove(id: string): void;
}
