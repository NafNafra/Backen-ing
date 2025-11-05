import { CreateCertificatDto } from './dto/create-certificat.dto';
import { UpdateCertificatDto } from './dto/update-certificat.dto';
import { CertificatResponseDto } from './dto/response-certificat.dto';
import { Certificat, CertificatDocument } from './entities/certificat.entity';
import { Model } from 'mongoose';
export declare class CertificatsService {
    private certificatModel;
    constructor(certificatModel: Model<CertificatDocument>);
    create(createCertificatDto: CreateCertificatDto): Promise<Certificat>;
    findAll(): Promise<Certificat[]>;
    findById(id: string): Promise<CertificatResponseDto>;
    update(id: string, updateCertificatDto: UpdateCertificatDto): Promise<Certificat>;
    remove(id: string): void;
}
