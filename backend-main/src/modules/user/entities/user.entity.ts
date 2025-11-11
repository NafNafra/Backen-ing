import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

export type UserDocument = mongoose.HydratedDocument<User>; // au lieu de faire User & Document

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true })
  idUser: string; // l’ID du customer venant du backend A

  @Prop()
  name: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  compteFb: string;

  @Prop()
  _OtpCode: string;

  @Prop()
  _OtpExpiresAt?: string;

  @Prop({ default: false })
  activated: boolean;

  @Prop()
  reactivationDate?: string;

  @Prop()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
