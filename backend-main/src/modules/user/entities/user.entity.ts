import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

export type UserDocument = mongoose.HydratedDocument<User>; // au lieu de faire User & Document

@Schema()
export class User {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  idUser: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  adresse: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  compteFb: string;

  @Prop()
  _OtpCode: string;

  @Prop()
  _OtpExpiresAt: string;

  @Prop()
  activated: boolean;

  @Prop()
  reactivationDate: string;

  @Prop()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
