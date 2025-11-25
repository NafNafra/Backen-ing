import { UserSex } from '@/commons/types/auth';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, IsBoolean, IsEnum } from 'class-validator';

export class ResponseRegisterDto {
  @ApiProperty({ example: "2" })
  _id: string;

  @ApiProperty({ example: "Alice", })
  firstname: string;

  @ApiProperty({ example: "Doe", })
  lastname: string;

  @ApiProperty({ example: "M", enum: ['M', 'F'] })
  sex: UserSex;


  @ApiProperty({ example: "+261341234567", })
  phone: string;

  @ApiProperty({ example: "Fianarantsoa", })
  adress: string;

  @ApiProperty({ example: "jr@rj.j", })
  @IsString()
  email: string;

  @ApiProperty({ example: "1997-06-12T21:00:00.000+00:00", })
  birthdate: string;

  @ApiProperty({
    example: "Antananarivo",
  })
  birthplace: string;

  @ApiProperty({ example: "https://facebook.com/jennie.kim", })
  compteFb: string;

  @ApiProperty({ example: "false", })
  inactive: boolean;

  constructor(partial: Partial<ResponseRegisterDto>) {
    Object.assign(this, partial)
  }
}