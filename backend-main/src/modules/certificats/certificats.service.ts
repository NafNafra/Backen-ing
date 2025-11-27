import { Injectable } from '@nestjs/common';
import { FsCertService } from '@/commons/providers/fsback/fs-cert.service';
import { FsPayementService } from '@/commons/providers/fsback/fs-payement.service';
import { CertDto } from '@/commons/providers/fsback/dto/cert.dto';

@Injectable()
export class CertificatsService {
  constructor(
    private readonly fsCert: FsCertService,
    private readonly fsPayment: FsPayementService,
  ) { }

  async findAll(): Promise<CertDto[]> {

    return this.fsCert.getCertificat();
  }

  async findById(customerId: string) {
    const formationProgramm = await this.fsCert.getCustomerCertDetails(customerId);
    return formationProgramm;
  }
}
