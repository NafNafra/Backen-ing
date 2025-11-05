import { Certificat } from '../entities/certificat.entity';
export declare class CertificatResponseDto {
    constructor(certificat: Certificat);
    id?: string;
    idStudent?: string;
    linkImage?: string;
    isPublik?: boolean;
}
