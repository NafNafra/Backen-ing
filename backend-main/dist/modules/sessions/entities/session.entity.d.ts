import mongoose, { Types } from 'mongoose';
export type SessionsDocument = mongoose.HydratedDocument<Sessions>;
export declare class Sessions {
    _id: string;
    dateDebut: Date;
    dateFin: Date;
    nombrePlace: number;
    creationDate: Date;
    formationId: Types.ObjectId;
}
export declare const SessionsSchema: mongoose.Schema<Sessions, mongoose.Model<Sessions, any, any, any, mongoose.Document<unknown, any, Sessions, any, {}> & Sessions & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Sessions, mongoose.Document<unknown, {}, mongoose.FlatRecord<Sessions>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<Sessions> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
