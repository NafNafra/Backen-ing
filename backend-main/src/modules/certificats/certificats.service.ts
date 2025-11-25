import { Injectable } from '@nestjs/common';
import { CreateCertificatDto } from '@/modules/certificats/dto/create-certificat.dto';
import { UpdateCertificatDto } from '@/modules/certificats/dto/update-certificat.dto';
import { CertificatResponseDto } from '@/modules/certificats/dto/response-certificat.dto';
import { Certificat, CertificatDocument } from '@/modules/certificats/entities/certificat.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { FsCertService } from '@/commons/providers/fsback/fs-cert.service';
import { FsPayementService } from '@/commons/providers/fsback/fs-payement.service';

@Injectable()
export class CertificatsService {
  constructor(
    @InjectModel(Certificat.name)
    private certificatModel: Model<CertificatDocument>,
    private readonly fsCert: FsCertService,
    private readonly fsPayment: FsPayementService,
  ) { }

  async findAll(): Promise<CertificatResponseDto[]> {
    const customerId = '12'
    const test = await this.fsPayment.getPaymentCustomer(customerId)
    console.log(test)
    return this.fsCert.getCertificat();
  }

  async findById(customerId: string) {
    const formationProgramm = await this.fsCert.getCustomerCertDetails(customerId);
    return formationProgramm;
  }

}
