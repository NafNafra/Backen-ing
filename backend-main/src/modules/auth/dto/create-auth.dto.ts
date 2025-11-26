import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { Types } from 'mongoose';

export class CreateAuthPhoneDto {
  @ApiProperty({ example: '0347327950' })
  @Length(10, 12, { message: 'Doit etre 10 chiffre' })
  @IsNotEmpty({ message: 'Ne doit pas etre vide' })
  phoneNumber: string;
}

export class VerifingCodeDto {
  @ApiProperty({ example: '0347327950' })
  @Length(10, 12, { message: 'Doit etre 10 chiffre' })
  @IsNotEmpty({ message: 'Ne doit pas etre vide' })
  phoneNumber: string;

  @IsNotEmpty({ message: 'Le code ne doit pas être vide.' })
  @ApiProperty({ example: '1234' })
  @Length(4, 4, { message: 'Code 4 maximum' })
  code: string;
}

export class VerifyCodeDto extends CreateAuthPhoneDto {
  @ApiProperty({
    example: '0347327950',
    description: 'Code OTP envoyé par SMS.',
  })
  @IsString()
  @Matches(/^\d{4,6}$/, {
    message: 'Le code doit être composé de 4 à 6 chiffres.',
  })
  @IsNotEmpty({ message: 'Le code ne doit pas être vide.' })
  code: string;
}

export class TokenDto {
  @ApiProperty({
    example: '0bnm-347cvbn-327vbhnj-9bn50',
  })
  @IsString()
  @IsNotEmpty({ message: 'Le token ne doit pas être vide.' })
  token: string;

  constructor(partial: Partial<TokenDto>) {
    Object.assign(this, partial);
  }
}

export class LogOutDto {
  @ApiProperty({
    example: '0bnm-347cvbn-327vbhnj-9bn50'
  })
  @IsString()
  @IsNotEmpty({ message: 'Le token ne doit pas être vide.' })
  _id: string;
}


