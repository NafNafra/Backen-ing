import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigsService } from '@/configs';
import { mentionNote } from '@/commons/utils';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class FsCertService {
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

  async getCertificat() {
    const certificat = await this.httpService.axiosRef.get(
      `${this.url}/cert/get`,
      this.headers
    );
    const certificats = certificat.data.Cert;

    return certificats;
  }

  async getCertById(formationId: string) {
    console.log(formationId)
    try {
      const customer = await this.httpService.axiosRef.get(
        `${this.url}/cert/getByAttributes?formationId=${formationId}`,
        this.headers
      )
      console.log(customer.data);

      if (customer.data.length > 1) throw new BadRequestException('Erreur dans la base de donnees')
      return customer.data;
    } catch (error) {
      throw new InternalServerErrorException('Erreur de connexion au serveur',);
    }
  }


  async getCertificatByFormationId(formationId: string) {
    const headers = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    // 1) Fetch ALL certificates once
    const res = await this.httpService.axiosRef.get(
      `${this.url}/cert/get`,
      headers
    );

    const certificats = res.data.Cert;
    if (!Array.isArray(certificats)) return [];

    // 2) Filter by formationId (FAST)
    return certificats.filter(c => c.formationId === formationId);
  }


}
