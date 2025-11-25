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
  ) {
    this.url = this.configsService.get('fs_url.base');
    this.token = this.configsService.get('fs_url.token');
    this.headers = {
      headers: {
        Authorization: `Bearer ${this.token}`
      },
    }
  }
  async getPaymentsByCustomer(customerId: string) {
    const res = await this.httpService.axiosRef.get(
      `${this.url}/payment/getByAttributes?customerId=${customerId}`,
      this.headers
    );

    return res.data ?? [];
  }

  // tous les payements
  async getPayementByAttribute(statement: string) {
    const payment = await this.httpService.axiosRef.get(
      `${this.url}/payment/getByAttributes?type=FORMATION&type=CERTIFICAT${statement}`,
      this.headers
    );
    // console.log(payment.data)

    return payment.data;
  }


  async getPaymentCustomer(customerId: string) { // type CERTIFICAT
    const state = `customerId=${customerId}`
    try {
      const customer = await this.getPayementByAttribute(`&${state}`)

      return customer.data;
    } catch (error) {
      throw new InternalServerErrorException('Erreur de connexion au serveur',);
    }
  }


}