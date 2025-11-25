import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, IsNumberString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {

  @ApiProperty({
    description: "Identifiant du customer venant du backend A",
    example: "42"
  })
  @IsNotEmpty({ message: 'Ne doit pas etre vide' })
  @IsNumberString()
  idUser: string;

  @ApiProperty({
    description: "Nom complet de l'utilisateur",
    example: "Alice Doe",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Numéro de téléphone de l'utilisateur",
    example: "+261341234567",
    required: false
  })
  @IsString()
  @Length(10, 13, { message: 'Doit etre 10-12 chiffre' })
  @IsNotEmpty({ message: 'Ne doit pas etre vide' })
  phoneNumber: string;

  @ApiProperty({
    description: "Compte Facebook de l'utilisateur",
    example: "Miracle Quin",
    required: false
  })
  @IsString()
  compteFb: string;

}
