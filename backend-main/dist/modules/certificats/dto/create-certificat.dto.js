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
exports.CreateCertificatDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCertificatDto {
    idStudent;
    linkImage;
    isPublik;
}
exports.CreateCertificatDto = CreateCertificatDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'fdiygoudgouhbdjv73ey2873yg' }),
    (0, class_validator_1.IsString)({ message: 'Chaine de caractere' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Ne doit pas etre vide' }),
    __metadata("design:type", String)
], CreateCertificatDto.prototype, "idStudent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'http://localhost:5000' }),
    (0, class_validator_1.IsString)({ message: 'Chaine de caractere' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Ne doit pas etre vide' }),
    __metadata("design:type", String)
], CreateCertificatDto.prototype, "linkImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Ne doit pas etre vide' }),
    __metadata("design:type", Boolean)
], CreateCertificatDto.prototype, "isPublik", void 0);
//# sourceMappingURL=create-certificat.dto.js.map