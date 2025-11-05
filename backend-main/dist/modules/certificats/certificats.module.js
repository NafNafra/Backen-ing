"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificatsModule = void 0;
const common_1 = require("@nestjs/common");
const certificats_service_1 = require("./certificats.service");
const certificats_controller_1 = require("./certificats.controller");
const mongoose_1 = require("@nestjs/mongoose");
const certificat_entity_1 = require("./entities/certificat.entity");
let CertificatsModule = class CertificatsModule {
};
exports.CertificatsModule = CertificatsModule;
exports.CertificatsModule = CertificatsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: certificat_entity_1.Certificat.name, schema: certificat_entity_1.CertificatSchema },
            ]),
        ],
        controllers: [certificats_controller_1.CertificatsController],
        providers: [certificats_service_1.CertificatsService],
        exports: [certificats_service_1.CertificatsService],
    })
], CertificatsModule);
//# sourceMappingURL=certificats.module.js.map