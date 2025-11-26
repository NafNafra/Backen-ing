import {ApiProperty} from "@nestjs/swagger";
import { CertificateResultDto } from "@/commons/providers/fsback/dto/cert.dto";
import { ResponseRegisterDto } from "@/modules/register/dto/response-register.dto";
export class CertificatResponseDto extends ResponseRegisterDto {
  @ApiProperty({ type: () => [CertificateResultDto] })
  results: CertificateResultDto[];
}
