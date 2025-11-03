"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormationResponseDto = void 0;
class FormationResponseDto {
    constructor(formation) {
        this.titre = formation.titre;
        this.description = formation.description;
        this.resume = formation.resume;
        this.duree = formation.duree;
    }
    id;
    titre;
    description;
    resume;
    duree;
}
exports.FormationResponseDto = FormationResponseDto;
//# sourceMappingURL=response-formation.dto.js.map