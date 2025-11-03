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

/**
 * 
import * as mongoose from 'mongoose';
import { Owner } from '../owners/schemas/owner.schema';

// inside the class definition
@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
owner: Owner;




import { Owner } from './schemas/owner.schema';

// e.g. inside a service or repository
async findAllPopulated() {
  return this.catModel.find().populate<{ owner: Owner }>("owner");
}

 */