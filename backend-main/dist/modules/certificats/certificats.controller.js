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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificatsController = void 0;
const common_1 = require("@nestjs/common");
const certificats_service_1 = require("./certificats.service");
const create_certificat_dto_1 = require("./dto/create-certificat.dto");
const update_certificat_dto_1 = require("./dto/update-certificat.dto");
let CertificatsController = class CertificatsController {
    certificatsService;
    constructor(certificatsService) {
        this.certificatsService = certificatsService;
    }
    create(createCertificatDto) {
        return this.certificatsService.create(createCertificatDto);
    }
    findAll() {
        return this.certificatsService.findAll();
    }
    findOne(id) {
        return this.certificatsService.findById(id);
    }
    async update(id, updateCertificatDto) {
        return this.certificatsService.update(id, updateCertificatDto);
    }
    async remove(id) {
        return this.certificatsService.remove(id);
    }
};
exports.CertificatsController = CertificatsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_certificat_dto_1.CreateCertificatDto]),
    __metadata("design:returntype", void 0)
], CertificatsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CertificatsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CertificatsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_certificat_dto_1.UpdateCertificatDto]),
    __metadata("design:returntype", Promise)
], CertificatsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CertificatsController.prototype, "remove", null);
exports.CertificatsController = CertificatsController = __decorate([
    (0, common_1.Controller)('certificats'),
    __metadata("design:paramtypes", [certificats_service_1.CertificatsService])
], CertificatsController);
//# sourceMappingURL=certificats.controller.js.map