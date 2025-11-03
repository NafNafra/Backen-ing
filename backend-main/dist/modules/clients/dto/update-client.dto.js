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
exports.UpdateClientDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class UpdateClientDto {
    idUser;
    name;
    phoneNumber;
    activated;
    _OtpCode;
    _OtpExpiresAt;
    reactivationDate;
    refreshToken;
    email;
}
exports.UpdateClientDto = UpdateClientDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "idUser", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Nom invalide" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Numéro de téléphone invalide" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(10, 10, { message: "Numéro de téléphone invalide (10 chiffres requis)" }),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({ message: "Statut d'activation invalide" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateClientDto.prototype, "activated", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Code Otp invalide" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "_OtpCode", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Date d'expiration Otp invalide" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "_OtpExpiresAt", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Exclude)(),
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "reactivationDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Exclude)(),
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", Object)
], UpdateClientDto.prototype, "refreshToken", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "email", void 0);
//# sourceMappingURL=update-client.dto.js.map