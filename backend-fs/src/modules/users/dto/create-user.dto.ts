import { IsNotEmpty, IsString, Length, IsNumberString } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: "Ne doit pas etre vide" })
  @IsNumberString()
  id: string

  @IsString({ message: "Chaine de caractere" })
  @IsNotEmpty({ message: "Ne doit pas etre vide" })
  name: string;

  @IsString({ message: "Chaine de caractere" })
  @IsNotEmpty({ message: "Ne doit pas etre vide" })
  email: string;

  @Length(10, 10, { message: "Doit etre 10 chiffre" })
  @IsNotEmpty({ message: "Ne doit pas etre vide" })
  phoneNumber: string;

  @Length(10, 10, { message: "Doit etre 10 chiffre" })
  @IsNotEmpty({ message: "Ne doit pas etre vide" })
  adresse: string;
}
