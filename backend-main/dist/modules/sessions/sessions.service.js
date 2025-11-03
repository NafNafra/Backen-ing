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
exports.SessionsService = void 0;
const common_1 = require("@nestjs/common");
const response_sessions_dto_1 = require("./dto/response-sessions.dto");
const mongoose_1 = require("@nestjs/mongoose");
const session_entity_1 = require("./entities/session.entity");
const mongoose_2 = require("mongoose");
const common_2 = require("@nestjs/common");
let SessionsService = class SessionsService {
    sessionsModel;
    constructor(sessionsModel) {
        this.sessionsModel = sessionsModel;
    }
    async create(createSessionsDto) {
        const sessions = new this.sessionsModel(createSessionsDto);
        return sessions.save();
    }
    async findAll() {
        return this.sessionsModel.find().exec();
    }
    async findById(id) {
        const sessions = await this.sessionsModel.findOne({ _id: id }).exec();
        if (!sessions)
            throw new common_2.NotFoundException("Sessions introuvable");
        return new response_sessions_dto_1.ResponseSessionsDto(sessions);
    }
    async update(id, updateSessionsDto) {
        const updatedSessions = await this.sessionsModel.findByIdAndUpdate(id, updateSessionsDto, { new: true, runValidators: true }).exec();
        if (!updatedSessions) {
            throw new common_2.NotFoundException(`Session avec id="${id}" non trouvé`);
        }
        return updatedSessions;
    }
    async remove(id) {
        const sessionsToDelete = this.sessionsModel.findByIdAndDelete(id).exec();
        if (!sessionsToDelete)
            throw new common_2.NotFoundException(`Client avec id=${id} non trouvé`);
    }
};
exports.SessionsService = SessionsService;
exports.SessionsService = SessionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(session_entity_1.Sessions.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SessionsService);
//# sourceMappingURL=sessions.service.js.map