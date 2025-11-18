import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type CertificatDocument = mongoose.HydratedDocument<Certificat>;

@Schema()
export class Certificat {
  @Prop({ require: true })
  id: string;

  @Prop({ required: true })
  mention: string;

  @Prop({ required: true })
  inactive: boolean;

  @Prop()
  formationId: string

  @Prop()
  createsAt: Date

  @Prop()
  updatedAt: Date
}

export const CertificatSchema = SchemaFactory.createForClass(Certificat);
