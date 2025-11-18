import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigsService } from '@/configs';


@Injectable()
export class FsPayementService {
  private url: string | undefined;
  private token: string | undefined;
  constructor(
    private readonly httpService: HttpService,
    private readonly configsService: ConfigsService,

  ) {
    this.url = this.configsService.get('fs_url.base');
    this.token = this.configsService.get('fs_url.token');
  }

  async getCertPayement() {
    const headers = {
      headers: {
        Authorization: `Bearer ${this.token}`
      },
    }
    const payment = await this.httpService.axiosRef.get(
      `${this.url}/payment/get`,
      headers
    );

    const payments = payment.data.Payment;

    const certPayment = payments.filter(p => p.type === "CERTIFICAT");

    console.log(certPayment)

    return certPayment;
  }
}