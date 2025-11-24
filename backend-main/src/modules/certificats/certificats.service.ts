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

  async create(createCertificatDto: CreateCertificatDto): Promise<Certificat> {
    const certificat = new this.certificatModel(createCertificatDto);
    return certificat.save();
  }

  async findAll(): Promise<CertificatResponseDto[]> {
    const customerId = '12'
    const test = await this.fsPayment.getPaymentCustomer(customerId)
    console.log(test)
    return this.fsCert.getCertificat();
  }

  async findById(id: string) { // : Promise<CertificatResponseDto[]> {
    id = "6fe73b9c-ea74-4c9e-8884-847cd4d48fdc";
    const customerPay = await this.fsPayment.getPayementByAttribute(id);
    return customerPay;
  }

  async update(
    id: string,
    updateCertificatDto: UpdateCertificatDto,
  ): Promise<Certificat> {
    const updatedCertificat = await this.certificatModel
      .findByIdAndUpdate(
        id,
        updateCertificatDto,
        { new: true, runValidators: true },
      )
      .exec();
    if (!updatedCertificat) {
      throw new NotFoundException(`Certificat avec id='${id}' non trouvé`);
    }
    return updatedCertificat;
  }

  remove(id: string): void {
    const certificatToDelete = this.certificatModel
      .findByIdAndDelete(id)
      .exec();
    if (!certificatToDelete)
      throw new NotFoundException(`Certificat avec id=${id} non trouvé`);
  }
}
