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
exports.FormationService = void 0;
const common_1 = require("@nestjs/common");
const response_formation_dto_1 = require("./dto/response-formation.dto");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const formation_entity_1 = require("./entities/formation.entity");
let FormationService = class FormationService {
    formationModel;
    constructor(formationModel) {
        this.formationModel = formationModel;
    }
    async create(createFormationDto) {
        const formation = new this.formationModel(createFormationDto);
        return formation.save();
    }
    async findAll() {
        return this.formationModel.find().exec();
    }
    async findById(id) {
        const formation = await this.formationModel.findOne({ _id: id }).exec();
        if (!formation)
            throw new common_1.NotFoundException('Formation introuvable');
        return new response_formation_dto_1.FormationResponseDto(formation);
    }
    async update(id, updateFormationDto) {
        const updatedFormation = await this.formationModel
            .findByIdAndUpdate(id, updateFormationDto, { new: true, runValidators: true })
            .exec();
        if (!updatedFormation) {
            throw new common_1.NotFoundException(`Formation avec id="${id}" non trouvé`);
        }
        return updatedFormation;
    }
    remove(id) {
        const formationToDelete = this.formationModel.findByIdAndDelete(id).exec();
        if (!formationToDelete)
            throw new common_1.NotFoundException(`Formation avec id=${id} non trouvé`);
    }
    async findOneWithSessions(id) {
        const formationSession = this.formationModel
            .findById(id)
            .populate('sessions')
            .exec();
        if (!formationSession)
            throw new common_1.NotFoundException('Formation with session not found');
        return formationSession;
    }
    async findAllWithSessions() {
        return this.formationModel
            .find()
            .populate('sessions')
            .exec();
    }
};
exports.FormationService = FormationService;
exports.FormationService = FormationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(formation_entity_1.Formation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FormationService);
//# sourceMappingURL=formation.service.js.map