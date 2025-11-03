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
exports.ContactToFs = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class ContactToFs {
    nom;
    numero;
    message;
}
exports.ContactToFs = ContactToFs;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Alice" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ContactToFs.prototype, "nom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12369 }),
    (0, class_validator_1.Length)(10, 10, { message: "Doit etre 10 chiffre" }),
    __metadata("design:type", String)
], ContactToFs.prototype, "numero", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Message" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ContactToFs.prototype, "message", void 0);
//# sourceMappingURL=contact-to-fs.dto.js.map