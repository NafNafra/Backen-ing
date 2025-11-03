import mongoose from "mongoose";
import { Sessions } from '../../sessions/entities/session.entity';
export type FormationDocument = mongoose.HydratedDocument<Formation>;
export declare class Formation {
    titre: string;
    description: string;
    duree: string;
    resume: string;
    creationDate: Date;
    sessions?: Sessions[];
}
export declare const FormationSchema: mongoose.Schema<Formation, mongoose.Model<Formation, any, any, any, mongoose.Document<unknown, any, Formation, any, {}> & Formation & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Formation, mongoose.Document<unknown, {}, mongoose.FlatRecord<Formation>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<Formation> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
