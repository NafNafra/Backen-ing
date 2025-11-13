import { Types } from 'mongoose';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginChosenUserDto {
  @ApiProperty({ example: '69130451810c61130917a1c6' })
  @Type(() => Types.ObjectId)
  @IsNotEmpty()
  id: Types.ObjectId;

  @ApiProperty({ example: '0349482910' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  activated: boolean;
}
