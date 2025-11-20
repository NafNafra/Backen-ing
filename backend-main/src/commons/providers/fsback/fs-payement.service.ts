import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigsService } from '@/configs';
import { FsCertService } from './fs-cert.service';
import { mentionNote } from '@/commons/utils';
import { FsCustomerService } from '@/commons/providers/fsback/fs-customer.service';
import { FsFormationService } from '@/commons/providers/fsback/fs-formation.service';
import { FsUserService } from '@/commons/providers/fsback/fs-user.service';

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
    private readonly fsUser: FsUserService
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
      ((p.type === "CERTIFICAT" || p.type === "FORMATION") && (p.customerId !== null))
    );

    return certPayment;
  }

  async getCertPerPayement() {
    const [payments, certificats] = await Promise.all([
      this.getCertPayement(),
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


  // customer+payment
  async getPaymentCustomer() { // type CERTIFICAT
    const [customers, payments] = await Promise.all([
      this.customer.getAllCustomer(),
      this.getCertPayement()
    ])

    const customerById = new Map(customers.map(c => [c.id, c]));

    return payments.map(p => ({
      ...p,
      customers: customerById.get(p.customerId) || null,
    }));
  }

  //Formation+Program+payment
  async getSessionPayment() {
    const [payments, sessions] = await Promise.all([
      this.getCertPayement(),
      this.fsFormation.getFormationsWithPrograms(),
    ]);

    const sessionById = new Map(sessions.map(s => [s.id, s]));

    return payments.map(p => ({
      ...p,
      sessions: p.targetId ? sessionById.get(p.targetId) : null,
    }));
  }

  //User+Payment
  async getUserPayment() {
    const [payments, users] = await Promise.all([
      this.getCertPayement(),
      this.fsUser.getUser(),
    ]);

    const userById = new Map(users.map(u => [u.id, u]));

    return payments.map(p => ({
      ...p,
      users: userById.get(p.userId) || null,
    }));
  }


  async cleanPaymentForCertificat(id: string) {
    const [pProgram, pCustomer, pUser] = await Promise.all([
      this.getSessionPayment(),
      this.getPaymentCustomer(),
      this.getUserPayment()
    ])

    const programById = new Map(pProgram.map(p => [p.id, p.sessions]));
    const userById = new Map(pUser.map(p => [p.id, p.users]));

    const result = pCustomer
      .filter(p => p.customers?.id === id)
      .map(p => ({
        ...p,
        program: programById.get(p.id),
        user: userById.get(p.id),
      }));

    console.log(result)
    return result;
  }
}