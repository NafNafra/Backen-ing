import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type FormationDocument = mongoose.HydratedDocument<Formation>

@Schema()
export class Formation {
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
