import { ApiProperty } from "@nestjs/swagger";

export class ProgramResponseDto {
  @ApiProperty({ example: "2" })
  _id: string;

  @ApiProperty({ example: "2020-08-31T00:00:00.000Z" })
  date: string;

  @ApiProperty({ example: null })
  detail: string | null;

  @ApiProperty({ example: 30000 })
  price: number;

  @ApiProperty({ example: 5000 })
  certprice: number;

  @ApiProperty({ example: "0" })
  place: string;

  @ApiProperty({ example: false })
  inactive: boolean;

  @ApiProperty({ example: "2" })
  formationId: string;

  @ApiProperty({ example: "2020-09-02T06:03:01.000Z" })
  createdAt: string;

  @ApiProperty({ example: "2022-08-01T10:44:13.000Z" })
  updatedAt: string;

  constructor(partial: Partial<ProgramResponseDto>) {
    Object.assign(this, partial);
  }
}