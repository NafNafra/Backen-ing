import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigsService } from '@/configs';
import { FsCertService } from './fs-cert.service';
import { Types } from 'mongoose';

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

    const certPayment = payments.filter(p => p.type === "CERTIFICAT");

    console.log(certPayment)

    return certPayment;
  }

  // certificat depuis payements
  async getCertPerPayement() {
    const [certPayment, certificat] = await Promise.all([
      this.getCertPayement(),
      this.certService.getCertificat(),
    ]);

    const combined = certificat.map(c => ({
      ...c,
      payments: certPayment.filter(cp => cp.targetId === c.id),
    }));

    console.log(combined)
    return combined;
  }

  // certificat d'un etudiant depuis un payement
  async customerCertPayment(id: string) {

    const allCertPayment = await this.getCertPerPayement();
    const customerCert = allCertPayment.filter(
      certPay => {
        if (certPay.payments.length === 0)
          throw new BadRequestException({ message: "Bad filtering" })

        return certPay.payments[0].customerId === id;
      }
    )
    console.log(customerCert)
    return allCertPayment
  }


}