import { User } from '@/modules/user/entities/user.entity';
import { Types } from 'mongoose';

export class UserResponseDto {
  constructor(user: User) {
    // this.id = user._id;
    this.idUser = user.idUser;
    this.name = user.name;
    this.phoneNumber = user.phoneNumber;
    // this.email = user.email;
    this.activated = user.activated;
    this.reactivationDate = user.reactivationDate;
    this.refreshToken = user.refreshToken;
  }
  _id: Types.ObjectId;

  idUser: string;

  name: string;

  phoneNumber: string;

  activated: boolean;

  reactivationDate?: string;

  refreshToken?: string;

  email: string;
}

export class UpdateUserResponseDto {
  constructor(data: UserResponseDto, message: string, statusCode: number) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
  }
  data: UserResponseDto;
  message: string;
  statusCode: number;
}
