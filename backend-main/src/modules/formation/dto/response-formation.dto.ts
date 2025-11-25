import { Formation } from '@/modules/formation/entities/formation.entity';

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
