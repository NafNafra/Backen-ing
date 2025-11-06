import { Certificat } from '@/modules/certificats/entities/certificat.entity';

export class CertificatResponseDto {
  constructor(certificat: Certificat) {
    this.idStudent = certificat.idStudent;
    this.linkImage = certificat.linkImage;
    this.isPublik = certificat.isPublik;
  }
  id?: string;

  idStudent?: string;

  linkImage?: string;

  isPublik?: boolean;
}
