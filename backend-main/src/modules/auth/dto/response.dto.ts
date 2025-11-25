import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { Types } from 'mongoose';

export type AuthResponse = {
  user: { id: Types.ObjectId; name: string; phoneNumber: string; activated: boolean }[];
  message: string;
  statusCode: HttpStatus;
  accessToken?: string;
  refreshToken?: string;
};


export class MessageResponseDto {
  @ApiProperty({ example: "Le code a été envoyé au numéro 034732..." })
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
