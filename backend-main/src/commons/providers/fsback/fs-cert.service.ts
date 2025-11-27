import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigsService } from '@/configs';
import { mentionNote } from '@/commons/utils';
import { FsFormationService } from '@/commons/providers/fsback/fs-formation.service';
import { FsCustomerService } from '@/commons/providers/fsback/fs-customer.service';
import { FsPayementService } from '@/commons/providers/fsback/fs-payement.service';

@Injectable()
export class FsCertService {
  private url: string | undefined;
  private token: string | undefined;
  private headers: object;
  constructor(
    private readonly httpService: HttpService,
    private readonly configsService: ConfigsService,
    private readonly fsFormation: FsFormationService,
    private readonly fsCustomer: FsCustomerService,
    private readonly fsPayment: FsPayementService,
  ) {
    this.url = this.configsService.get('fs_url.base');
    this.token = this.configsService.get('fs_url.token');
    this.headers = {
      headers: {
        Authorization: `Bearer ${this.token}`
      },
    }
  }

  async getCertificat() {
    const certificat = await this.httpService.axiosRef.get(
      `${this.url}/cert/getByAttributes?id=1`,
      this.headers
    );
    const certificats = certificat.data;

    return certificat.data;
  }

  async getCertById(formationId: string) {
    try {
      const res = await this.httpService.axiosRef.get(
        `${this.url}/cert/getByAttributes?formationId=${formationId}`,
        this.headers
      )
      const certs = res.data;

      certs[0].mention = mentionNote(certs[0].mention)
      return certs?.[0] ?? null;
    } catch (error) {
      console.warn(`Cert not found for paymentId: ${formationId}`);
    }
  }

  async getCustomerCertDetails(customerId: string) {
    const cus = await this.fsCustomer.getCustById(customerId);

    const customer = cus[0];
    if (!customer) {
      throw new NotFoundException("Customer not found");
    }

    const paymentsRes = await this.httpService.axiosRef.get(
      `${this.url}/payment/getByAttributes?customerId=${customerId}`,
      this.headers
    );
    const payments = await this.fsPayment.getPaymentsByCustomer(customerId);

    const paymentIds = payments.map(p => p._id);

    if (paymentIds.length === 0) {
      return [];
    }

    const certs = await Promise.all(
      paymentIds.map(pid => this.getCertById(pid))
    );

    const filteredCerts = certs.filter(c => c);


    if (filteredCerts.length === 0) {
      return [];
    }

    const results: any[] = [];

    for (const cert of filteredCerts) {
      const payment = payments.find(p => p._id == cert.formationId);

      const session = await this.fsFormation.getSession(payment.targetId)

      results.push({
        cert,
        payment,
        session
      });
    }

    return {
      ...customer,
      results: results
    };
  }

}
