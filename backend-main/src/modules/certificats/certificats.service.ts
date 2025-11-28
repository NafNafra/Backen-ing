import { Injectable } from '@nestjs/common';
import { FsCertService } from '@/commons/providers/fsback/fs-cert.service';
import { FsPayementService } from '@/commons/providers/fsback/fs-payement.service';
import { CertDto } from '@/commons/providers/fsback/dto/cert.dto';
import { UsersService } from '../user/user.service';

@Injectable()
export class CertificatsService {
  constructor(
    private readonly fsCert: FsCertService,
    private readonly userService: UsersService
  ) { }

  async findAll(): Promise<CertDto[]> {

    return this.fsCert.getCertificat();
  }

  async findById(customerId: string) {
    const userId = await this.userService.findById(customerId);
    console.log("Here ", userId, userId._id);
    const formationProgramm = await this.fsCert.getCustomerCertDetails(userId._id);
    return formationProgramm;
  }

  async findSpecificCert(customerId: string, certId: string) {
    const userId = await this.userService.findById(customerId);
    const formationProgramm = await this.fsCert.getCustomerCertDetails(userId._id);
    const specificResult = formationProgramm.results.find(result => result.cert._id === certId);
    if (!specificResult) {
      throw new Error('Certificate not found');
    }
    return {
      ...formationProgramm,
      results: [specificResult]
    };
  }
}
