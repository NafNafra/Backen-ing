import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFormationDto {
  @ApiProperty({ example: 'Formation Word' })
  @IsString({ message: 'Chaine de caractere' })
  @IsNotEmpty({ message: 'Ne doit pas etre vide' })
  titre: string;

  @ApiProperty({ example: 'Description' })
  @IsString({ message: 'Chaine de caractere' })
  @IsNotEmpty({ message: 'Ne doit pas etre vide' })
  description: string;

  @ApiProperty({ example: 'Resume' })
  @IsNotEmpty({ message: 'Ne doit pas etre vide' })
  resume: string;

  @ApiProperty({ example: '2 semaines' })
  @IsNotEmpty({ message: 'Ne doit pas etre vide' })
  duree: string;
}
