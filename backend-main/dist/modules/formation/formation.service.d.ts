import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { FormationResponseDto } from './dto/response-formation.dto';
import { Model } from 'mongoose';
import { Formation, FormationDocument } from './entities/formation.entity';
export declare class FormationService {
    private formationModel;
    constructor(formationModel: Model<FormationDocument>);
    create(createFormationDto: CreateFormationDto): Promise<Formation>;
    findAll(): Promise<Formation[]>;
    findById(id: string): Promise<FormationResponseDto>;
    update(id: string, updateFormationDto: UpdateFormationDto): Promise<Formation>;
    remove(id: string): Promise<void>;
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
    findAllWithSessions(): Promise<Formation[]>;
}
