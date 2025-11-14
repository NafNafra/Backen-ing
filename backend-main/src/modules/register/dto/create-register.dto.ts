import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString, IsEmail, IsBoolean } from 'class-validator';

export class CreateRegisterDto {
  @ApiProperty({ example: "Jean" })
  @IsString()
  firstname: string;

  @ApiProperty({ example: "Rakoto" })
  @IsString()
  lastname: string;

  @ApiPropertyOptional({ example: "Andrainjato Fianarantsoa" })
  @IsOptional()
  @IsString()
  adress?: string;

  @ApiPropertyOptional({ example: "test@gmail.com" })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: "1997-06-12T21:00:00.000Z" })
  @IsOptional()
  @IsDateString()
  birthdate?: string;

  @ApiPropertyOptional({ example: "Fort-Dauphin" })
  @IsOptional()
  @IsString()
  birthplace?: string;

  @ApiPropertyOptional({ example: "0344829110" })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: "https://facebook.com/foobar" })
  @IsOptional()
  @IsString()
  facebook?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  inactive?: boolean;

  @ApiPropertyOptional({ example: "photo-file.jpg" })
  @IsOptional()
  @IsString()
  photo?: string;
}
