import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { Types } from 'mongoose';
import { VerifyUserDto } from '@/modules/user/dto/verify-user.dto';

export type AuthResponse = {
  user: { _id: Types.ObjectId; name: string; phoneNumber: string; activated: boolean }[];
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

export class VerifyCodeResponseDto {
  @ApiProperty({
    example: "Code vérifié. Sélectionnez l'utilisateur à connecter."
  })
  message: string;

  @ApiProperty({ type: [VerifyUserDto] })
  user: VerifyUserDto[];

  @ApiProperty({ example: 200 })
  statusCode: HttpStatus;

  constructor(partial: Partial<VerifyCodeResponseDto>) {
    Object.assign(this, partial);
  }
}

export class LoginResponseDto {
  @ApiProperty({ type: VerifyUserDto })
  user: VerifyUserDto;

  @ApiProperty({ example: 'Connexion réussie' })
  message: string;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'abcd.efgh.ijkl' })
  accessToken: string;

  @ApiProperty({ example: 'mnop.qrst.uvwx' })
  refreshToken?: string;
  
  constructor(partial: Partial<LoginResponseDto>) {
    Object.assign(this, partial);
  }
}