import { Injectable } from '@nestjs/common';
import { CreateCertificatDto } from './dto/create-certificat.dto';
import { UpdateCertificatDto } from './dto/update-certificat.dto';
import { CertificatResponseDto } from './dto/response-certificat.dto';
import { Certificat, CertificatDocument } from './entities/certificat.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CertificatsService {
  constructor(
    @InjectModel(Certificat.name)
    private certificatModel: Model<CertificatDocument>,
  ) {}

  async create(createCertificatDto: CreateCertificatDto): Promise<Certificat> {
    const certificat = new this.certificatModel(createCertificatDto);
    return certificat.save();
  }

  async findAll(): Promise<Certificat[]> {
    return this.certificatModel.find().exec();
  }

  async findById(id: string): Promise<CertificatResponseDto> {
    const certificat = await this.certificatModel.findOne({ _id: id }).exec();
    if (!certificat) throw new NotFoundException('Certificat introuvable');
    return new CertificatResponseDto(certificat);
  }

  async update(
    id: string,
    updateCertificatDto: UpdateCertificatDto,
  ): Promise<Certificat> {
    const updatedCertificat = await this.certificatModel
      .findByIdAndUpdate(
        id,
        updateCertificatDto,
        { new: true, runValidators: true }, // new : retournes le doc mis à jour
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
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (!certificatToDelete)
      throw new NotFoundException(`Certificat avec id=${id} non trouvé`);
  }
}
