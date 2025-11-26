import { ApiProperty } from "@nestjs/swagger";
import { PaymentDto } from "./payment.dto";
import { SessionDto } from "./session.dto";

export class CertDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  mention: string | number;

  @ApiProperty()
  inactive: boolean;

  @ApiProperty()
  formationId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<CertDto>) {
    Object.assign(this, partial);
  }
}

export class CertificateResultDto {
  @ApiProperty({ type: () => CertDto })
  cert: CertDto;

  @ApiProperty({ type: () => PaymentDto })
  payment: PaymentDto;

  @ApiProperty({ type: () => SessionDto })
  session: SessionDto;
}
