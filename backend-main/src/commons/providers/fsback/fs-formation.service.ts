import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigsService } from '@/configs';

@Injectable()
export class FsFormationService {
  private url: string | undefined;
  private token: string | undefined;
  constructor(
    private readonly httpService: HttpService,
    private readonly configsService: ConfigsService,

  ) {
    this.url = this.configsService.get('fs_url.base');
    this.token = this.configsService.get('fs_url.token');
  }

  // '/formation/get',
  // '/formation/save',
  // '/formation/remove',

  /*
  {
          "id": "4",
          "name": "Internet Avancé",
          "fullname": "Internet Avancé",
          "inactive": false,
          "createdAt": "2020-09-08T06:48:40.000Z",
          "updatedAt": "2022-07-23T08:07:12.000Z"
      },

      
  */

  async getFormationsWithPrograms() {
    const headers = {
      headers: {
        Authorization: `Bearer ${this.token}`
      },
    }
    // Appel simultané aux 2 endpoints externes
    const [formationsRes, programsRes] = await Promise.all([
      this.httpService.axiosRef.get(`${this.url}/formation/get`, headers),
      this.httpService.axiosRef.get(`${this.url}/formation/get`, headers),
    ]);

    const formations = formationsRes.data.data;
    const programs = programsRes.data.data;

    // Liaison : formation.id → program.formation_id
    const combined = formations.map(f => ({
      ...f,
      programs: programs.filter(p => p.formation_id === f.id),
    }));

    return combined;
  }
}
