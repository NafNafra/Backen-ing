import { ApiProperty } from "@nestjs/swagger";
export class SessionDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  detail: string | null;

  @ApiProperty()
  price: number;

  @ApiProperty()
  certprice: number;

  @ApiProperty()
  place: string;

  @ApiProperty()
  inactive: boolean;

  @ApiProperty()
  formationId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}