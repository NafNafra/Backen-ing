import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid'

export type ClientDocument = mongoose.HydratedDocument<Client>; // au lieu de faire User & Document

@Schema()
export class Client {
  @Prop({ type: String, default: uuidv4 })
  _id: string;

  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  adresse:string;

  @Prop({ unique: true })
  phoneNumber: string;

  @Prop()
  compteFb: string;

  @Prop()
  _2faCode: string;

  @Prop()
  _2faExpiresAt: string;

  @Prop()
  activated: boolean
}

export const ClientSchema = SchemaFactory.createForClass(Client)