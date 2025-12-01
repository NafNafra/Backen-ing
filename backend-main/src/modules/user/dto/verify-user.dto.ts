import { UserSex } from "@/commons/types/auth";
import { ApiProperty } from "@nestjs/swagger";

export class VerifyUserDto {
  @ApiProperty({ example: "65f123abc9d99e12aabb0001" })
  _id: string;

  @ApiProperty({ example: "John" })
  firstname: string;

  @ApiProperty({ example: "Doe" })
  lastname: string;

  @ApiProperty({ example: "M" })
  sex: UserSex;

  
  @ApiProperty({ example: "john.doe" })
  compteFb: string;

  @ApiProperty({ example: "+261341234567" })
  phoneNumber: string;

  @ApiProperty({ example: true })
  activated: boolean;
}
