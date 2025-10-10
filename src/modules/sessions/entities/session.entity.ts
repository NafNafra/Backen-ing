import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document, Types } from 'mongoose'

export type SessionsDocument = mongoose.HydratedDocument<Sessions>

@Schema()
export class Sessions {
  @Prop({ required: true })
  dateDebut: Date;

  @Prop({ required: true })
  dateFin: Date;

  @Prop({ required: true })
  nombrePlace: number;

  @Prop({ default: Date.now })
  creationDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'Formation', required: true })
  formationId: Types.ObjectId;
}

export const SessionsSchema = SchemaFactory.createForClass(Sessions)