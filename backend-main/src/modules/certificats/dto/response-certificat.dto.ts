import { Certificat } from '@/modules/certificats/entities/certificat.entity';

export class CertificatResponseDto {
  constructor(certificat: Certificat) {
    this.id = certificat.id;
    this.mention = certificat.mention;
    this.inactive = certificat.inactive;
    this.formation = certificat.formationId;
    this.createdAt = certificat.createsAt;
    this.updatedAt = certificat.updatedAt;

  }
  id?: string;

  mention?: string;

  inactive?: boolean;

  formation?: string;

  createdAt?: Date;

  updatedAt?: Date;

}
