import mongoose from "mongoose";
export type ClientDocument = mongoose.HydratedDocument<Client>;
export declare class Client {
    _id: string;
    idUser: string;
    name: string;
    email: string;
    adresse: string;
    phoneNumber: string;
    compteFb: string;
    _OtpCode: string;
    _OtpExpiresAt: string;
    activated: boolean;
    reactivationDate: string;
    refreshToken: string;
}
export declare const ClientSchema: mongoose.Schema<Client, mongoose.Model<Client, any, any, any, mongoose.Document<unknown, any, Client, any, {}> & Client & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Client, mongoose.Document<unknown, {}, mongoose.FlatRecord<Client>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<Client> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
