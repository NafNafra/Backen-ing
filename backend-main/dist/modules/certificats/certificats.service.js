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
exports.CertificatsService = void 0;
const common_1 = require("@nestjs/common");
const response_certificat_dto_1 = require("./dto/response-certificat.dto");
const certificat_entity_1 = require("./entities/certificat.entity");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_2 = require("@nestjs/common");
let CertificatsService = class CertificatsService {
    certificatModel;
    constructor(certificatModel) {
        this.certificatModel = certificatModel;
    }
    async create(createCertificatDto) {
        const certificat = new this.certificatModel(createCertificatDto);
        return certificat.save();
    }
    async findAll() {
        return this.certificatModel.find().exec();
    }
    async findById(id) {
        const certificat = await this.certificatModel.findOne({ _id: id }).exec();
        if (!certificat)
            throw new common_2.NotFoundException('Certificat introuvable');
        return new response_certificat_dto_1.CertificatResponseDto(certificat);
    }
    async update(id, updateCertificatDto) {
        const updatedCertificat = await this.certificatModel
            .findByIdAndUpdate(id, updateCertificatDto, { new: true, runValidators: true })
            .exec();
        if (!updatedCertificat) {
            throw new common_2.NotFoundException(`Certificat avec id='${id}' non trouvé`);
        }
        return updatedCertificat;
    }
    remove(id) {
        const certificatToDelete = this.certificatModel
            .findByIdAndDelete(id)
            .exec();
        if (!certificatToDelete)
            throw new common_2.NotFoundException(`Certificat avec id=${id} non trouvé`);
    }
};
exports.CertificatsService = CertificatsService;
exports.CertificatsService = CertificatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(certificat_entity_1.Certificat.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CertificatsService);
//# sourceMappingURL=certificats.service.js.map