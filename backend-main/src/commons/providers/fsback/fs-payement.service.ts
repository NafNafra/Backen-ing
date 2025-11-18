import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigsService } from '@/configs';
import { FsCertService } from './fs-cert.service';
import { Types } from 'mongoose';
import { mentionNote } from '@/commons/utils';

@Injectable()
export class FsPayementService {
  private url: string | undefined;
  private token: string | undefined;
  private headers
  constructor(
    private readonly httpService: HttpService,
    private readonly configsService: ConfigsService,
    private readonly certService: FsCertService,

  ) {
    this.url = this.configsService.get('fs_url.base');
    this.token = this.configsService.get('fs_url.token');
    this.headers = {
      headers: {
        Authorization: `Bearer ${this.token}`
      },
    }
  }

  // tous les payements
  async getCertPayement() {
    const payment = await this.httpService.axiosRef.get(
      `${this.url}/payment/get`,
      this.headers
    );

    const payments = payment.data.Payment;

    const certPayment = payments.filter(p =>
      ((p.type === "CERTIFICAT") && (p.customerId !== null))
    );

    return certPayment;
  }

  // certificat depuis payements
  async getCertPerPayement() {
    const [certPayment, certificat] = await Promise.all([
      this.getCertPayement(),
      this.certService.getCertificat(),
    ]);

    const combined = certPayment.map(c => ({
      ...c,
      certificat: certificat.filter(cp => c.targetId === cp.id),
      mention: mentionNote(certificat[0].mention),
      formationId: certificat[0].formationId
    }));

    console.log(combined)
    return combined;
  }

  // certificat d'un etudiant depuis un payement
  async customerCertPayment(id: string) {
    const allCertPayment = await this.getCertPerPayement();
    const customerCert = allCertPayment.filter(
      certPay => {
        if (certPay.length === 0)
          throw new BadRequestException({ message: "Bad filtering" })

        return certPay.customerId === id;
      }
    )
    return customerCert
  }


}