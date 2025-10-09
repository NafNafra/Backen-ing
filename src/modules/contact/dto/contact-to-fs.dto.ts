import { IsString, IsNotEmpty, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ContactToFs {
  @ApiProperty({ example: "Alice" })
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty({ example: 12369 })
  @Length(10, 10, { message: "Doit etre 10 chiffre" })
  numero: string;

  @ApiProperty({ example: "Message" })
  @IsString()
  @IsNotEmpty()
  message: string;
}