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
exports.SmsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const configs_1 = require("../../../configs");
let SmsService = class SmsService {
    httpService;
    configsService;
    constructor(httpService, configsService) {
        this.httpService = httpService;
        this.configsService = configsService;
    }
    async sendSms(phone, message) {
        const token = this.configsService.get('sms.token');
        const body = {
            phone: phone,
            message: message
        };
        try {
            console.log(token + " " + body.message);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Une erreur s'est produite lors de l'envoi du message, mais votre compte a été créé. \n Vous pouvez essayer de vous connecter");
        }
    }
    async sendSmsToFs(phone, message) {
        const token = this.configsService.get('sms.token');
        const body = {
            phone: process.env.FS_CONTACT,
            message: message
        };
        try {
            console.log(body.message + " " + body.phone);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Une erreur s'est produite lors de l'envoi du message, mais votre compte a été créé. \n Vous pouvez essayer de vous connecter");
        }
    }
};
exports.SmsService = SmsService;
exports.SmsService = SmsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        configs_1.ConfigsService])
], SmsService);
//# sourceMappingURL=sms.service.js.map