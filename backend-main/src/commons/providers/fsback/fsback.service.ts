import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigsService } from 'src/configs';

@Injectable()
export class FsbackService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configsService: ConfigsService,
  ) { }

  getUsersByPhone(phone: string) {
    console.log(phone)
    const url = this.configsService.get('fs_url.base');
    const token = this.configsService.get('fs_url.token');
    try {
      const customers = this.httpService.axiosRef.get(`${url}/customer/getByAttributes?id=11`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      })
      console.log(customers);
    } catch (error) {
      throw new InternalServerErrorException('Erreur de connexion au serveur',);
    }
  }
}
