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
exports.CreateClientDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateClientDto {
    idUser;
    name;
    email;
    phoneNumber;
    adresse;
    compteFb;
}
exports.CreateClientDto = CreateClientDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "12" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Ne doit pas etre vide" }),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "idUser", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Alice" }),
    (0, class_validator_1.IsString)({ message: "Chaine de caractere" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Ne doit pas etre vide" }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Alice" }),
    (0, class_validator_1.IsString)({ message: "Chaine de caractere" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Ne doit pas etre vide" }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12369 }),
    (0, class_validator_1.Length)(10, 10, { message: "Doit etre 10 chiffre" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Ne doit pas etre vide" }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Andrainjato Fianarantsoa" }),
    (0, class_validator_1.Length)(10, 10, { message: "Doit etre 10 chiffre" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Ne doit pas etre vide" }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "adresse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Jean Dupont" }),
    (0, class_validator_1.Length)(10, 10, { message: "Doit etre 10 chiffre" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Ne doit pas etre vide" }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "compteFb", void 0);
//# sourceMappingURL=create-client.dto.js.map