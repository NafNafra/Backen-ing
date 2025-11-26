import { User } from '@/modules/user/entities/user.entity';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {

  @ApiProperty({ example: '65f123abc9d99e12aabb0001' })
  _id: string;

  @ApiProperty({ example: '42' })
  idUser: string;

  @ApiProperty({ example: 'Alice Doe' })
  name: string;

  @ApiProperty({ example: '+261341234567' })
  phoneNumber: string;

  @ApiProperty({ example: true })
  activated: boolean;

  @ApiProperty({ example: '2025-02-01T10:00:00.000Z', required: false })
  reactivationDate?: string;

  @ApiProperty({ example: 'abcd.efgh.1234', required: false })
  refreshToken?: string;

  @ApiProperty({ example: 'alice@example.com', required: false })
  email: string;

  constructor(user: User & { _id: Types.ObjectId }) {
    this._id = user._id.toString();
    this.idUser = user.idUser;
    this.name = user.name;
    this.phoneNumber = user.phoneNumber;
    this.activated = user.activated;
    this.reactivationDate = user.reactivationDate;
    this.refreshToken = user.refreshToken;
    this.email = (user as any).email ?? null;
  }
}

export class UpdateUserResponseDto {
  @ApiProperty({
    type: UserResponseDto,
    description: 'Updated user details',
  })
  data: UserResponseDto;

  @ApiProperty({
    example: 'Informations mises à jour avec succès',
  })
  message: string;

  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  constructor(partial: Partial<UpdateUserResponseDto>) {
    Object.assign(this, partial);
  }
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

  @ApiProperty({ example: '534657ytuhgbvg' })
  reactivationDate: string;

  @ApiProperty({ example: "sedr5657ytuhgnb gt756yuijymn nbv" })
  refreshToken: string;

  constructor(
    partial: Partial<CreateUserResponseDto>
  ) { Object.assign(this, partial) }

}
