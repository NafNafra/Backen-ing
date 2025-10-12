import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid'

export type FormationDocument = mongoose.HydratedDocument<Formation>

@Schema()
export class Formation {
  @Prop({ type: String, default: uuidv4 })
  _id: string;

  @Prop({ required: true, unique: true })
  titre: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  duree: string; // ex: en heures

  @Prop({ required: true })
  resume: string;

  @Prop({ default: Date.now })
  creationDate: Date;
}

export const FormationSchema = SchemaFactory.createForClass(Formation);
