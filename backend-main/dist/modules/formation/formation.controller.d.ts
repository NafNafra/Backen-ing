import { FormationService } from './formation.service';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { Formation } from './entities/formation.entity';
export declare class FormationController {
    private readonly formationService;
    constructor(formationService: FormationService);
    create(createFormationDto: CreateFormationDto): Promise<Formation>;
    findAll(): Promise<Formation[]>;
    findOne(id: string): Promise<import("./dto/response-formation.dto").FormationResponseDto>;
    update(id: string, updateFormationDto: UpdateFormationDto): Promise<Formation>;
    remove(id: string): void;
    findOneWithSessions(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Formation, {}, {}> & Formation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Formation, {}, {}> & Formation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    listAll(): Promise<Formation[]>;
}
