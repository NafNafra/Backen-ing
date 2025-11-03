import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type CertificatDocument = mongoose.HydratedDocument<Certificat>

@Schema()
export class Certificat {

    @Prop({ require: true })
    idStudent: string

    @Prop({ required: true })
    linkImage: string;

    @Prop({ required: true })
    isPublik: boolean;

}

export const CertificatSchema = SchemaFactory.createForClass(Certificat)