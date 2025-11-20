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

  async getFormationsWithPrograms() {
    const headers = {
      headers: {
        Authorization: `Bearer ${this.token}`
      },
    }
    const [formationsRes, programsRes] = await Promise.all([
      this.httpService.axiosRef.get(`${this.url}/formation/get`, headers),
      this.httpService.axiosRef.get(`${this.url}/program/get`, headers),
    ]);

    const formations = formationsRes.data.Formation;
    const programs = programsRes.data.Program;
    const sessions = programs.map(p => {
      const uniqueFormation = formations.filter(f => p.formationId == f.id);
      return ({
        ...p,
        formations: uniqueFormation[0],
      })
    });
    console.log("PROGRAM & FORMATION :", sessions)

    return sessions;
  }
}
