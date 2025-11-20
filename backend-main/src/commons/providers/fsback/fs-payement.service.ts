import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigsService } from '@/configs';
import { FsCertService } from './fs-cert.service';
import { mentionNote } from '@/commons/utils';
import { FsCustomerService } from './fs-customer.service';
import { FsFormationService } from './fs-formation.service';
import { FsUserService } from './fs-user.service';
import { Sessions } from '@/modules/sessions/entities/session.entity';

@Injectable()
export class FsPayementService {
  private url: string | undefined;
  private token: string | undefined;
  private headers
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
    const [payment, certificat] = await Promise.all([
      this.getCertPayement(),
      this.certService.getCertificat(),
    ]);

    const combined = certificat.map(c => {
      const uniquePayment = payment.filter(cp => c.formationId === cp.id)
      return ({
        ...c,
        payment: uniquePayment[0],
        mention: mentionNote(c.mention),
      })
    });

    // console.log("CERTIFICAT & PAYMENT :", combined)
    return combined;
  }


  // customer+payment
  async getPaymentCustomer() { // type CERTIFICAT
    const [customers, payments] = await Promise.all([
      this.customer.getAllCustomer(),
      this.getCertPayement()
    ])

    const combined = payments.map(p => {
      const uniqueCustomer = customers.filter(c => c.id === p.customerId);
      return ({
        ...p,
        customers: uniqueCustomer[0],
      })
    });

    console.log("Customer & Payment ", combined)
    return combined;
  }

  //Formation+Program+payment
  async getSessionPayment() {
    const [payment, sessions] = await Promise.all([
      this.getCertPayement(),
      this.fsFormation.getFormationsWithPrograms(),
    ]);

    const combined = payment.map(p => {
      const uniqueSession = sessions.filter(s => s.id === p.targetId && p.targetId !== null);
      return ({
        ...p,
        sessions: uniqueSession[0],
      })
    });

    // console.log("FORMATIONS_PROGRAMS & PAYMENT :", combined)
    return combined;
  }

  //User+Payment
  async getUserPayment() {
    const [payment, users] = await Promise.all([
      this.getCertPayement(),
      this.fsUser.getUser(),
    ]);

    const combined = payment.map(p => {
      const uniqueUser = users.filter(u => u.id === p.userId);
      return ({
        ...p,
        users: uniqueUser[0],
      })
    });

    console.log("USER & PAYMENT :", combined)
    return combined;
  }
}