import { User } from '@/modules/user/entities/user.entity';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumberString, Length } from 'class-validator';

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

export class CreateUserResponseDto {
  @ApiProperty({ example: "42" })
  _id: string;

  @ApiProperty({ example: "42" })
  idUser: string;

  @ApiProperty({ example: "Alice Doe", })
  name: string;

  @ApiProperty({ example: "+261341234567", })
  phoneNumber: string;

  @ApiProperty({ example: "Miracle Quin", })
  compteFb: string;

  @ApiProperty({ example: "1234" })
  _OtpCode: string;

  @ApiProperty({ example: "wsdfgthy.p875tef.r534t6yghb" })
  _OtpExpiresAt: string;

  @ApiProperty({ example: false })
  activated: boolean;

  @ApiProperty({ example: '534657ytuhgbvg'})
  reactivationDate: string;

  @ApiProperty({ example: "sedr5657ytuhgnb gt756yuijymn nbv"})
  refreshToken: string;

  constructor(
    partial: Partial<CreateUserResponseDto>
  ) { Object.assign(this, partial) }

}
