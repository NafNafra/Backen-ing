import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsBoolean,
  Length,
  IsEmail,
  IsNumberString,
} from 'class-validator';
import { Types } from 'mongoose';

export class UpdateUserDto {
  @IsNumberString()
  @ApiProperty({ example: 'sdcfvghbnj' })
  _id?: Types.ObjectId;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ example: '12' })
  idUser?: string;

  @IsString({ message: 'Nom invalide' })
  @IsOptional()
  name?: string;

  @IsString({ message: 'Numéro de téléphone invalide' })
  @IsOptional()
  @Length(10, 10, {
    message: 'Numéro de téléphone invalide (10 chiffres requis)',
  })
  phoneNumber?: string;

  @IsBoolean({ message: "false" })
  activated: boolean;

  @IsString({ message: 'Code Otp invalide' })
  @IsOptional()
  _OtpCode?: string;

  @IsString({ message: "Date d'expiration Otp invalide" })
  @IsOptional()
  _OtpExpiresAt?: string;

  @IsString()
  @IsOptional()
  @Exclude()
  @ApiHideProperty()
  reactivationDate?: string;

  @IsString()
  @IsOptional()
  @Exclude()
  @ApiHideProperty()
  refreshToken?: string | null;

  @IsOptional()
  @IsEmail()
  email?: string;
}
