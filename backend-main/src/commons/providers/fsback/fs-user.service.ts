import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigsService } from '@/configs';

@Injectable()
export class FsUserService {
  private url: string | undefined;
  private token: string | undefined;
  constructor(
    private readonly httpService: HttpService,
    private readonly configsService: ConfigsService,

  ) {
    this.url = this.configsService.get('fs_url.base');
    this.token = this.configsService.get('fs_url.token');
  }

  async getUser() {
    const headers = {
      headers: {
        Authorization: `Bearer ${this.token}`
      },
    }
    const certificat = await this.httpService.axiosRef.get(
      `${this.url}/user/get`,
      headers
    );
    const certificats = certificat.data.User;

    return certificats;
  }

}
