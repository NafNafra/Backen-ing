import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigsService } from '@/configs';
import { BadRequestException } from '@nestjs/common';
import { CreateAuthPhoneDto } from '@/modules/auth/dto/create-auth.dto';
@Injectable()
export class FsCustomerService {
  private url: string | undefined;
  private token: string | undefined;
  private headers: object;
  constructor(
    private readonly httpService: HttpService,
    private readonly configsService: ConfigsService,

  ) {
    this.url = this.configsService.get('fs_url.base');
    this.token = this.configsService.get('fs_url.token');
    this.headers = {
      Authorization: `Bearer ${this.token}`,
    };
  }

  async getAllCustomer() {
    try {
      const customer = await this.httpService.axiosRef.get(
        `${this.url}/customer/get`,
        { headers: this.headers }
      )

      if (customer.data.Customer.length == null) throw new BadRequestException('Erreur dans la base de donnees')
      return customer.data.Customer;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Erreur de connexion au serveur', error);
    }
  }

  async getCustById(idUser: string) {
    try {
      const customer = await this.httpService.axiosRef.get(
        `${this.url}/customer/getByAttributes?_id=${idUser}`,
        this.headers
      )
      // console.log(customer.data);

      if (customer.data.length > 1) throw new BadRequestException('Erreur dans la base de donnees')
      return customer.data;
    } catch (error) {
      throw new InternalServerErrorException('Erreur de connexion au serveur',);
    }
  }

  async getCustsByPhone(phoneNumber: CreateAuthPhoneDto) {
    try {

      const customers = await this.httpService.axiosRef.get(
        `${this.url}/customer/getByAttributes?phone=${phoneNumber.phoneNumber}`,
        this.headers
      )
      return customers.data;
    } catch (error) {
      throw new InternalServerErrorException('Erreur de connexion au serveur',);
    }
  }

  async saveCustomer(body: object) {
    try {
      const customer = await this.httpService.axiosRef.post(
        `${this.url}/customer/save`,
        body,
        { headers: this.headers }
      )

      if (!customer.data || customer.data.error)
        throw new BadRequestException(`Erreur lors de l'enregistrement de l'etudiant`);

      return customer.data;
    } catch (erreur) {
      throw new InternalServerErrorException(erreur);
    }
  }
}
