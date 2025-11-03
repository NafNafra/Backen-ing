import { Formation } from "../entities/formation.entity";
export declare class FormationResponseDto {
    constructor(formation: Formation);
    id?: string;
    titre?: string;
    description?: string;
    resume?: string;
    duree?: string;
}
