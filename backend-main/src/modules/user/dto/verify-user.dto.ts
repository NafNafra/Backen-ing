import { ApiProperty } from "@nestjs/swagger";

export class VerifyUserDto {
  @ApiProperty({ example: "65f123abc9d99e12aabb0001" })
  _id: string;

  @ApiProperty({ example: "John Doe" })
  name: string;

  @ApiProperty({ example: "john.doe" })
  compteFb: string;

  @ApiProperty({ example: "+261341234567" })
  phoneNumber: string;

  @ApiProperty({ example: true })
  activated: boolean;
}
