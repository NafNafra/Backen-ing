import { BadRequestException, Injectable } from '@nestjs/common';
import { PhoneDto } from '@/commons/providers/fs-url/dto/create-auth.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigsService } from 'src/configs';

@Injectable()
export class FsUrlService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configsService: ConfigsService,
  ) { }

  // Chercher tous les utilisateurs avec ce numero telephone
  async findUsersByPhone(phoneNumber: string) { //There sould be a promise
    console.log("Number :", phoneNumber)
    const users = await this.httpService.axiosRef.get(
      `${this.configsService.get('fs_url.base')}/customer/getByAttributes?phone=${phoneNumber}`,
      {
        headers: {
          Authorization: `Bearer ${this.configsService.get('fs_url.token')}`,
        },
      },
    );
    console.log("Found it ?   ", users.data);
    return users.data;
  }

  async findUserById(id:string) { //There sould be a promise
    const users = await this.httpService.axiosRef.get(
      `${this.configsService.get('fs_url.base')}/customer/getByAttributes?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${this.configsService.get('fs_url.token')}`,
        },
      },
    );
    if(users.data.length > 1) throw  new BadRequestException("Erreur dans la base de donnees")
    return users.data;
  }
}
