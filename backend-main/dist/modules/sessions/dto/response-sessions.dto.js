"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseSessionsDto = void 0;
class ResponseSessionsDto {
    constructor(sessions) {
        this.id = sessions._id;
        this.dateDebut = sessions.dateDebut;
        this.dateFin = sessions.dateFin;
        this.nombrePlace = sessions.nombrePlace;
        this.creationDate = sessions.creationDate;
        this.formationId = sessions.formationId;
    }
    id;
    dateDebut;
    dateFin;
    nombrePlace;
    creationDate;
    formationId;
}
exports.ResponseSessionsDto = ResponseSessionsDto;
//# sourceMappingURL=response-sessions.dto.js.map