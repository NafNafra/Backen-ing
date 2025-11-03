import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid'

export type UserDocument = mongoose.HydratedDocument<User>; // au lieu de faire User & Document

@Schema()
export class User {
  @Prop({ type: String, default: uuidv4 })
  _id: string;

  @Prop()
  idUser: string;

  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  adresse: string;

  @Prop({ unique: true })
  phoneNumber: string;

  @Prop()
  compteFb: string;

  @Prop()
  _OtpCode: string;

  @Prop()
  _OtpExpiresAt: string;

  @Prop()
  activated: boolean

  @Prop()
  reactivationDate: string;

  @Prop()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User)