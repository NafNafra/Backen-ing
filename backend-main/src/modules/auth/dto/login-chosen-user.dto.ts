import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginChosenUserDto {
  @ApiProperty({ example: '69130451810c61130917a1c6' })
  @IsString()
  @IsNotEmpty()
  _id: string;

  @ApiProperty({ example: '0347327950' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  activated: boolean;
}
