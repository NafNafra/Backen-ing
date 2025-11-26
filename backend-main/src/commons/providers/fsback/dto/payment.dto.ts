import { ApiProperty } from "@nestjs/swagger";

export class PaymentDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  targetId: string;

  @ApiProperty()
  inactive: boolean;

  @ApiProperty()
  type: string;

  @ApiProperty()
  rest: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  customerId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  createdAt: String;

  @ApiProperty()
  upstringdAt: String;
}