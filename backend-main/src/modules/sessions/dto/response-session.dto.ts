import { ApiProperty } from "@nestjs/swagger";
import { ProgramResponseDto } from "./response-program.dto";

export class SessionResponseDto {
  @ApiProperty({ example: "2" })
  _id: string;

  @ApiProperty({ example: "Leadership" })
  name: string;

  @ApiProperty({ example: "Leadership" })
  fullname: string;

  @ApiProperty({ example: false })
  inactive: boolean;

  @ApiProperty({ example: "2020-09-02T06:02:28.000Z" })
  createdAt: string;

  @ApiProperty({ example: "2022-07-23T08:07:12.000Z" })
  updatedAt: string;

  @ApiProperty({ type: [ProgramResponseDto] })
  programs: ProgramResponseDto[];

  constructor(partial: Partial<SessionResponseDto>) {
    Object.assign(this, partial);
  }
}