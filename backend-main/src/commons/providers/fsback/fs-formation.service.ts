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
    // console.log({
    //   ...programs,
    //   name: formationRes.name,
    //   fullname: formationRes.fullname
    // })
    return {
      ...programs,
      name: formationRes.name,
      fullname: formationRes.fullname
    };
  }
}
