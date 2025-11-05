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
