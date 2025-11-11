import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateAuthPhoneDto {
  @ApiProperty({ example: '0349482910' })
  @Length(10, 12, { message: 'Doit etre 10 chiffre' })
  @IsNotEmpty({ message: 'Ne doit pas etre vide' })
  phoneNumber: string;
}

export class VerifyCodeDto extends CreateAuthPhoneDto {
  @ApiProperty({
    example: '0349482910',
    description: 'Code OTP envoyé par SMS.',
  })
  @IsString()
  @Matches(/^\d{4,6}$/, {
    message: 'Le code doit être composé de 4 à 6 chiffres.',
  })
  @IsNotEmpty({ message: 'Le code ne doit pas être vide.' })
  code: string;
}
