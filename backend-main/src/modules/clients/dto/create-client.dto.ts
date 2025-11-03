import { ApiProperty } from "@nestjs/swagger";

import { IsNotEmpty, IsString, Length, IsNumberString } from "class-validator";

export class CreateClientDto {
  @ApiProperty({ example: "12" })
  @IsNotEmpty({ message: "Ne doit pas etre vide" })
  @IsNumberString()
  idUser: string


  @ApiProperty({ example: "Alice" })
  @IsString({ message: "Chaine de caractere" })
  @IsNotEmpty({ message: "Ne doit pas etre vide" })
  name: string;

  @ApiProperty({ example: "Alice" })
  @IsString({ message: "Chaine de caractere" })
  @IsNotEmpty({ message: "Ne doit pas etre vide" })
  email: string;

  @ApiProperty({ example: 12369 })
  @Length(10, 10, { message: "Doit etre 10 chiffre" })
  @IsNotEmpty({ message: "Ne doit pas etre vide" })
  phoneNumber: string;

  @ApiProperty({ example: "Andrainjato Fianarantsoa" })
  @Length(10, 10, { message: "Doit etre 10 chiffre" })
  @IsNotEmpty({ message: "Ne doit pas etre vide" })
  adresse: string;

  @ApiProperty({ example: "Jean Dupont" })
  @Length(10, 10, { message: "Doit etre 10 chiffre" })
  @IsNotEmpty({ message: "Ne doit pas etre vide" })
  compteFb: string;
}
