import { CertificatsService } from './certificats.service';
import { CreateCertificatDto } from './dto/create-certificat.dto';
import { UpdateCertificatDto } from './dto/update-certificat.dto';
export declare class CertificatsController {
    private readonly certificatsService;
    constructor(certificatsService: CertificatsService);
    create(createCertificatDto: CreateCertificatDto): Promise<import("./entities/certificat.entity").Certificat>;
    findAll(): Promise<import("./entities/certificat.entity").Certificat[]>;
    findOne(id: string): Promise<import("./dto/response-certificat.dto").CertificatResponseDto>;
    update(id: string, updateCertificatDto: UpdateCertificatDto): Promise<import("./entities/certificat.entity").Certificat>;
    remove(id: string): Promise<void>;
}
