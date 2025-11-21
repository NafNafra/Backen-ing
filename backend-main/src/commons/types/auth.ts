import { Types } from 'mongoose';

export type payload = {
  id: Types.ObjectId;
  phone: string;
  activated: boolean;
};

export type phonePayload = {
  id: Types.ObjectId;
  phone: string;
  activated: boolean;
};

export type externPayload = {
  idUser: string;
  name: string;
  phoneNumber: string;
  compteFb: string;
  activated: boolean;
}

export enum UserSex {
  F = 'F',
  M = 'M'
}
