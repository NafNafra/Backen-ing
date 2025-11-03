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
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const sms_service_1 = require("../../commons/providers/sms/sms.service");
let ContactService = class ContactService {
    smsService;
    constructor(smsService) {
        this.smsService = smsService;
    }
    async sendMessageToFs(contactFs) {
        const { nom, numero, message } = contactFs;
        const contenu = `Nouveau message de ${nom} avec numero ${numero}\n\"${message}\"`;
        await this.smsService.sendSmsToFs(numero, contenu);
        return {
            message: "Message envoyee a FS avec success"
        };
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sms_service_1.SmsService])
], ContactService);
//# sourceMappingURL=contact.service.js.map