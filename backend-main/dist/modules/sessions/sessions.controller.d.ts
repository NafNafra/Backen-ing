import { SessionsService } from './sessions.service';
import { CreateSessionsDto } from './dto/create-session.dto';
import { UpdateSessionsDto } from './dto/update-session.dto';
export declare class SessionsController {
    private readonly sessionsService;
    constructor(sessionsService: SessionsService);
    create(createSessionDto: CreateSessionsDto): Promise<import("./entities/session.entity").Sessions>;
    findAll(): Promise<import("./entities/session.entity").Sessions[]>;
    findOne(id: string): Promise<import("./dto/response-sessions.dto").ResponseSessionsDto>;
    update(id: string, updateSessionDto: UpdateSessionsDto): Promise<import("./entities/session.entity").Sessions>;
    remove(id: string): void;
}
