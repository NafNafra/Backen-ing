"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSessionsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateSessionsDto {
    formationId;
    dateDebut;
    dateFin;
    nombrePlace;
}
exports.CreateSessionsDto = CreateSessionsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "qwer4567tyu7890uio123" }),
    (0, class_validator_1.IsString)({ message: "Chaine de caractere" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Ne doit pas etre vide" }),
    __metadata("design:type", String)
], CreateSessionsDto.prototype, "formationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2025-10-10T08:00:00.000Z" }),
    (0, class_validator_1.IsString)({ message: "Chaine de caractere" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Ne doit pas etre vide" }),
    __metadata("design:type", Date)
], CreateSessionsDto.prototype, "dateDebut", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2025-10-20T17:00:00.000Z" }),
    (0, class_validator_1.IsString)({ message: "Chaine de caractere" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Ne doit pas etre vide" }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateSessionsDto.prototype, "dateFin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30 }),
    (0, class_validator_1.IsInt)({ message: "Doit être un nombre entier" }),
    (0, class_validator_1.Min)(15, { message: "Doit être au moins 15" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Ne doit pas etre vide" }),
    __metadata("design:type", Number)
], CreateSessionsDto.prototype, "nombrePlace", void 0);
//# sourceMappingURL=create-session.dto.js.map