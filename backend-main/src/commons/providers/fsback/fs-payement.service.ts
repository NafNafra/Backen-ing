import { BadRequestException, InternalServerErrorException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigsService } from '@/configs';
import { FsCertService } from './fs-cert.service';
import { mentionNote } from '@/commons/utils';
import { FsCustomerService } from '@/commons/providers/fsback/fs-customer.service';
import { FsFormationService } from '@/commons/providers/fsback/fs-formation.service';

@Injectable()
export class FsPayementService {
  private url: string | undefined;
  private token: string | undefined;
  private headers: object
  constructor(
    private readonly httpService: HttpService,
    private readonly configsService: ConfigsService,
    private readonly certService: FsCertService,
    private readonly customer: FsCustomerService,
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
  async getCertPayement(statement: string) {
    const payment = await this.httpService.axiosRef.get(
      `${this.url}/payment/getByAttributes?type=FORMATION&type=CERTIFICAT${statement}`,
      this.headers
    );

    return payment.data.Payment;
  }


  //Formation+Program+payment
  async getSessionPayment(programId: string) {
    const [payments, sessions] = await Promise.all([
      this.getCertPayement(`&targetId=${programId}`),
      this.fsFormation.getSession(programId),
    ]);

    const sessionById = new Map(sessions.map(s => [s.id, s]));

    return payments.map(p => ({
      ...p,
      sessions: p.targetId ? sessionById.get(p.targetId) : null,
    }));
  }

  async getCertPerPayement() {
    const [payments, certificats] = await Promise.all([
      this.getCertPayement('2645'),
      this.certService.getCertificat(),
    ]);

    const paymentByFormationId = new Map(
      payments.map(p => [p.formationId, p])
    );

    return certificats.map(c => ({
      ...c,
      payment: paymentByFormationId.get(c.formationId) || null,
      mention: mentionNote(c.mention),
    }));
  }


  // customer in payment
  async getPaymentCustomer(customerId: string) { // type CERTIFICAT
    console.log(customerId)
    try {
      const customer = await this.httpService.axiosRef.get(
        `${this.url}/payment/getByAttributes?customerId=${customerId}`,
        this.headers
      )
      console.log(customer.data);

      return customer.data;
    } catch (error) {
      throw new InternalServerErrorException('Erreur de connexion au serveur',);
    }
  }


}