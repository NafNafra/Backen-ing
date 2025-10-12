import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document, Types } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export type SessionsDocument = mongoose.HydratedDocument<Sessions>

@Schema()
export class Sessions {
  @Prop({ type: String, default: uuidv4 })
  _id: string;

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