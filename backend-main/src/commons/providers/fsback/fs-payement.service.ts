import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigsService } from '@/configs';
import { FsCertService } from './fs-cert.service';
import { Types } from 'mongoose';
import { mentionNote } from '@/commons/utils';
import { FsFormationService } from '@/commons/providers/fsback/fs-formation.service';

@Injectable()
export class FsPayementService {
  private url: string | undefined;
  private token: string | undefined;
  private headers
  constructor(
    private readonly httpService: HttpService,
    private readonly configsService: ConfigsService,
    private readonly certService: FsCertService,
    private readonly fsFormation: FsFormationService,

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

    const combined = certPayment.map(c => {
      const certForPayment = certificat.filter(cp => c.targetId === cp.id);
      return {
        ...c,
        certificat: certForPayment,
        mention: mentionNote(certificat[0].mention),
        formationId: certificat[0].formationId.toString()
      }
    });

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

    const formation = await this.fsFormation.getFormationsWithPrograms()
    console.log(formation)

    const cleanCertUser = customerCert.filter(
      cc => {
        const formations = formation.filter(f => {
          console.log(f.id, cc.formationId)
          return f.id == cc.formationId
        });
        console.log(formations)
      }
    )
    console.log("CertUser : ", cleanCertUser)

    return customerCert
  }


}