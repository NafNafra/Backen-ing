import { UserSex } from '@/commons/types/auth';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, IsNumberString, IsDate, IsBoolean, IsEnum } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRegisterDto {

  @ApiProperty({
    description: "First name",
    example: "Alice",
    required: true
  })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    description: "Last name",
    example: "Doe",
    required: false
  })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    description: "Genre l'utilisateur",
    example: "M",
    required: false
  })
  @IsEnum(['F', 'M'], { message: 'sex must be M or F' })
  sex: UserSex;


  @ApiProperty({
    description: "Numéro de téléphone de l'utilisateur",
    example: "+261341234567",
    required: true
  })
  @IsString()
  @Length(10, 13, { message: 'Doit etre 10-12 chiffre' })
  @IsNotEmpty({ message: 'Ne doit pas etre vide' })
  phone: string;

  @ApiProperty({
    description: "Adresse de l'utilisateur",
    example: "Fianarantsoa",
    required: false
  })
  @IsString()
  adress: string;

  @ApiProperty({
    description: "Email de l'utilisateur",
    example: "jr@rj.j",
    required: false
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: "Date d'anniversaire de l'utilisateur",
    example: "1997-06-12T21:00:00.000+00:00",
    required: true
  })
  @IsDate()
  birthdate: Date;

  @ApiProperty({
    description: "Lieu de naissance de l'utilisateur",
    example: "Antananarivo",
    required: true
  })
  @IsString()
  birthplace: string;


  @ApiProperty({
    description: "Compte Facebook de l'utilisateur",
    example: "https://facebook.com/jennie.kim",
    required: false
  })
  @IsString()
  compteFb: string;

  @ApiProperty({
    description: "Compte actif",
    example: "false",
    required: true
  })
  @IsBoolean()
  inactive: boolean;
}