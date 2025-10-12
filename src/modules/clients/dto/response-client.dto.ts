import { HttpStatus } from "@nestjs/common";
import { Client } from "../entities/client.entity";


export class ClientResponseDto {
  constructor(
    user: Client
  ) {
    this.id = user._id;
    this.name = user.name;
    this.phoneNumber = user.phoneNumber;
    this.email = user.email;
    this.activated = user.activated;
    this.reactivationDate = user.reactivationDate;
    this.refreshToken = user.refreshToken;
  }
  id?: string;

  name?: string;

  phoneNumber?: string;

  activated?: boolean;

  reactivationDate?: string;

  refreshToken?: string;

  email: string;

}

export class UpdateClientResponseDto {
  constructor(
    data: ClientResponseDto,
    message: string,
    statusCode: number
  ) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
  }
  data: ClientResponseDto;
  message: string;
  statusCode: number;
}
