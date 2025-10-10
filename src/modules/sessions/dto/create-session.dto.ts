import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsDate } from "class-validator";

export class CreateSessionsDto {
  @ApiProperty({ example: "qwer4567tyu7890uio123" })
  @IsString({ message: "Chaine de caractere" })
  @IsNotEmpty({ message: "Ne doit pas etre vide" })
  idFormation: string;

  @ApiProperty({ example: "Formation Word" })
  @IsString({ message: "Chaine de caractere" })
  @IsNotEmpty({ message: "Ne doit pas etre vide" })
  dateDebut: Date;

  @ApiProperty({ example: "Description" })
  @IsString({ message: "Chaine de caractere" })
  @IsNotEmpty({ message: "Ne doit pas etre vide" })
  dateFin: Date;

  @ApiProperty({ example: "Resume" })
  @IsNotEmpty({ message: "Ne doit pas etre vide" })
  nombrePlace: number;

  @ApiProperty({ example: "2 semaines" })
  @IsNotEmpty({ message: "Ne doit pas etre vide" })
  creationDate: Date;

}
