import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigsService } from '@/configs';
import { BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';

interface Formation {
  id: string;
  name: string;
  fullname: string;
}

@Injectable()
export class FsFormationService {
  private url: string | undefined;
  private token: string | undefined;
  private headers
  constructor(
    private readonly httpService: HttpService,
    private readonly configsService: ConfigsService,

  ) {
    this.url = this.configsService.get('fs_url.base');
    this.token = this.configsService.get('fs_url.token');
    this.headers = {
      headers: {
        Authorization: `Bearer ${this.token}`
      },
    }
  }

  // Get Formation => Program by ProgramID
  async getProgramById(id: string) {
    try {
      const program = await this.httpService.axiosRef.get(
        `${this.url}/program/getByAttributes?_id=${id}`,
        this.headers
      )
      console.log(id, program.data[0])
      if (program.data.length > 1) throw new BadRequestException('Erreur dans la base de donnees')
      return program.data[0];
    } catch (error) {
      throw new InternalServerErrorException('Erreur de connexion au serveur',);
    }
  }

  async getFormationById(id: string) {
    try {
      const formation = await this.httpService.axiosRef.get(
        `${this.url}/formation/getByAttributes?_id=${id}`,
        this.headers
      )
      console.log(id, formation.data[0])


      if (formation.data.length > 1 || formation.data.length == 0) throw new BadRequestException('Erreur dans la base de donnees')
      return formation.data[0];
    } catch (error) {
      throw new InternalServerErrorException('Erreur de connexion au serveur',);
    }
  }

  async getSession(programId: string) {
    const programs = await this.getProgramById(programId);
    if (!programs) {
      throw new Error(`Program with _id ${programId} not found`);
    }
    const formationRes = await this.getFormationById(programs.formationId);
    console.log({
      ...programs,
      name: formationRes.name,
      fullname: formationRes.fullname
    })
    return {
      ...programs,
      name: formationRes.name,
      fullname: formationRes.fullname
    };
  }



  async getCustomerCertDetails(customerId: string) {
    // ---------------------------------------
    // 1. Get the customer
    // ---------------------------------------
    const customerRes = await this.httpService.axiosRef.get(
      `${this.url}/customer/getByAttributes?_id=${customerId}`,
      this.headers
    );
    const customer = customerRes.data[0];
    if (!customer) {
      throw new NotFoundException("Customer not found");
    }
    console.log(customerRes.data)

    // ---------------------------------------
    // 2. Get all payments of the customer
    // ---------------------------------------
    const paymentsRes = await this.httpService.axiosRef.get(
      `${this.url}/payment/getByAttributes?customerId=${customerId}`,
      this.headers
    );
    const payments = paymentsRes.data;
    const paymentIds = payments.map(p => p._id);
    console.log(paymentsRes.data)

    if (paymentIds.length === 0) {
      return [];
    }

    // ---------------------------------------
    // 3. Get certs that reference these payments
    // (cert.formationId = payment._id)
    // ---------------------------------------
    const certs: any[] = [];

    for (const pid of paymentIds) {
      try {
        const certRes = await this.httpService.axiosRef.get(
          `${this.url}/cert/getByAttributes?formationId=${pid}`,
          this.headers
        );

        if (certRes.data) {
          certs.push(certRes.data[0]);
        }

      } catch (err) {
        // Ne pas spam, juste ignorer si aucune data
        console.warn(`Cert not found for paymentId: ${pid}`);
      }
    }

    console.log(certs)

    if (certs.length === 0) {
      return [];
    }


    // ---------------------------------------
    // 4. For each cert → add payment → program → formation
    // ---------------------------------------
    const results: any[] = [];

    for (const cert of certs) {
      const payment = payments.find(p => p._id == cert.formationId);

      const session = await this.getSession(payment.targetId)
      console.log(payment, payment.targetId)

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
