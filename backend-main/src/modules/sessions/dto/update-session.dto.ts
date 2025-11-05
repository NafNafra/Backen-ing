import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate, IsInt, Min } from 'class-validator';

export class UpdateSessionsDto {
  @ApiProperty({ example: '2025-10-10T08:00:00.000Z' })
  @IsString({ message: 'Chaine de caractere' })
  @IsNotEmpty({ message: 'Ne doit pas etre vide' })
  dateDebut?: Date;

  @ApiProperty({ example: '2025-10-20T17:00:00.000Z' })
  @IsString({ message: 'Chaine de caractere' })
  @IsNotEmpty({ message: 'Ne doit pas etre vide' })
  @IsDate()
  dateFin?: Date;

  @ApiProperty({ example: 30 })
  @IsInt({ message: 'Doit être un nombre entier' })
  @Min(15, { message: 'Doit être au moins 15' })
  @IsNotEmpty({ message: 'Ne doit pas etre vide' })
  nombrePlace?: number;
}
