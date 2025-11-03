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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const client_entity_1 = require("./entities/client.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const response_client_dto_1 = require("./dto/response-client.dto");
const axios_1 = require("@nestjs/axios");
let ClientsService = class ClientsService {
    clientModel;
    httpService;
    constructor(clientModel, httpService) {
        this.clientModel = clientModel;
        this.httpService = httpService;
    }
    async createClient(createClientDto) {
        const client = new this.clientModel(createClientDto);
        return client.save();
    }
    async findAll() {
        return this.clientModel.find().exec();
    }
    async findById(userId) {
        const user = await this.clientModel.findOne({ _id: userId }).exec();
        if (!user)
            throw new common_1.NotFoundException("L'utilisateur spécifié est introuvable");
        return new response_client_dto_1.ClientResponseDto(user);
    }
    async findByPhone(phoneNumber) {
        const client = await this.clientModel.findOne({ phoneNumber }).exec();
        try {
            const body = { phone: phoneNumber };
            const response = await this.httpService.axiosRef.get(`${process.env.BACKEND_FS_URL}/customer/getByAttributes?phone=0342603642`);
            console.log(response.data);
        }
        catch (error) {
            console.error('Erreur API externe:', error.response?.data || error.message);
        }
        return client;
    }
    async update(userId, userDto) {
        if (userDto === null)
            throw new common_1.BadRequestException("Veuillez spécifier les informations à mettre à jour");
        const updatedUser = await this.clientModel.findByIdAndUpdate(userId, userDto, { new: true }).exec();
        if (!updatedUser)
            throw new common_1.NotFoundException("L'utilisateur à mettre à jour est introuvable.");
        return new response_client_dto_1.UpdateClientResponseDto(new response_client_dto_1.ClientResponseDto(updatedUser), "Informations mises à jour avec succès", 200);
    }
    async remove(id) {
        const deleted = await this.clientModel.findByIdAndDelete(id).exec();
        if (!deleted)
            throw new common_1.NotFoundException('Client not found');
        return deleted;
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(client_entity_1.Client.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, axios_1.HttpService])
], ClientsService);
//# sourceMappingURL=clients.service.js.map