import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid'
import { Sessions } from '../../sessions/entities/session.entity'

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

  sessions?: Sessions[];

}

export const FormationSchema = SchemaFactory.createForClass(Formation);

FormationSchema.virtual('sessions', {
  ref: "Sessions",
  localField: "_id",
  foreignField: "formationId"
})

FormationSchema.set('toObject', { virtuals: true })
FormationSchema.set('toJSON', { virtuals: true })