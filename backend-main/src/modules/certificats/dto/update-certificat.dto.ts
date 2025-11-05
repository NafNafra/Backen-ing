import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCertificatDto {
  @ApiProperty({ example: 'fdiygoudgouhbdjv73ey2873yg' })
  @IsString({ message: 'Chaine de caractere' })
  @IsNotEmpty({ message: 'Ne doit pas etre vide' })
  idStudent?: string;

  @ApiProperty({ example: 'http://localhost:5000' })
  @IsString({ message: 'Chaine de caractere' })
  @IsNotEmpty({ message: 'Ne doit pas etre vide' })
  linkImage?: string;

  @ApiProperty({ example: false })
  @IsNotEmpty({ message: 'Ne doit pas etre vide' })
  isPublik?: boolean;
}
