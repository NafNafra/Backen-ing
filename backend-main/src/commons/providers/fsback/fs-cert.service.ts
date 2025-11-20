import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigsService } from '@/configs';
import { FsPayementService } from './fs-payement.service';
import { mentionNote } from '@/commons/utils';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class FsCertService {
  private url: string | undefined;
  private token: string | undefined;
  constructor(
    private readonly httpService: HttpService,
    private readonly configsService: ConfigsService,
    private readonly fsPayement: FsPayementService,

  ) {
    this.url = this.configsService.get('fs_url.base');
    this.token = this.configsService.get('fs_url.token');
  }

  async getCertificat() {
    const headers = {
      headers: {
        Authorization: `Bearer ${this.token}`
      },
    }
    const certificat = await this.httpService.axiosRef.get(
      `${this.url}/cert/get`,
      headers
    );
    const certificats = certificat.data.Cert;

    return certificats;
  }


  async getCertPerPayement() {
    const [certPayment, certificat] = await Promise.all([
      this.fsPayement.getCertPayement(),
      this.getCertificat(),
    ]);

    const combined = certPayment.filter(cp => {
      const certForPayment = certificat.filter(c => cp.id === c.formationId);
      return {
        ...cp,
        // certificat: certForPayment, // array de certificat
        mention: mentionNote(certificat[0].mention),
        formationId: certForPayment[0].formationId.toString(),
      }
    });

    return combined;
  }
  // async cleanCertificat() {
    //   this.fsPayment.getPaymentCustomer(),
    //   this.fsPayment.getSessionPayment(),
    //   this.fsPayment.getUserPayement(),
    //   this.fsPayment.getCertPerPayement()

  // }

}
