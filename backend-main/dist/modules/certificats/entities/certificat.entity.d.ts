import mongoose from 'mongoose';
export type CertificatDocument = mongoose.HydratedDocument<Certificat>;
export declare class Certificat {
    idStudent: string;
    linkImage: string;
    isPublik: boolean;
}
export declare const CertificatSchema: mongoose.Schema<Certificat, mongoose.Model<Certificat, any, any, any, mongoose.Document<unknown, any, Certificat, any, {}> & Certificat & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Certificat, mongoose.Document<unknown, {}, mongoose.FlatRecord<Certificat>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<Certificat> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
