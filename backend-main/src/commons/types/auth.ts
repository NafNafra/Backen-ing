import { Types } from 'mongoose';

export type payload = {
  _id: Types.ObjectId;
  phoneNumber: string;
  activated: boolean;
};

export type phonePayload = {
  id: Types.ObjectId;
  phone: string;
  activated: boolean;
};

export type externPayload = {
  idUser: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  sex?: UserSex;
  activated: boolean;
}

export enum UserSex {
  F = 'F',
  M = 'M'
}
