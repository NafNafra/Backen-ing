import { Formation } from '../entities/formation.entity';

export class FormationResponseDto {
  constructor(formation: Formation) {
    // this.id = formation.id;
    this.titre = formation.titre;
    this.description = formation.description;
    this.resume = formation.resume;
    this.duree = formation.duree;
  }
  id?: string;

  titre?: string;

  description?: string;

  resume?: string;

  duree?: string;
}

// export class UpdateClientResponseDto {
//   constructor(
//     data: ClientResponseDto,
//     message: string,
//     statusCode: number
//   ) {
//     this.data = data;
//     this.message = message;
//     this.statusCode = statusCode;
//   }
//   data: ClientResponseDto;
//   message: string;
//   statusCode: number;
// }
