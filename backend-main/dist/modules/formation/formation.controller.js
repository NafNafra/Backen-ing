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
exports.FormationController = void 0;
const common_1 = require("@nestjs/common");
const formation_service_1 = require("./formation.service");
const create_formation_dto_1 = require("./dto/create-formation.dto");
const update_formation_dto_1 = require("./dto/update-formation.dto");
let FormationController = class FormationController {
    formationService;
    constructor(formationService) {
        this.formationService = formationService;
    }
    create(createFormationDto) {
        return this.formationService.create(createFormationDto);
    }
    findAll() {
        return this.formationService.findAll();
    }
    findOne(id) {
        return this.formationService.findById(id);
    }
    update(id, updateFormationDto) {
        return this.formationService.update(id, updateFormationDto);
    }
    remove(id) {
        return this.formationService.remove(id);
    }
    async findOneWithSessions(id) {
        return this.formationService.findOneWithSessions(id);
    }
    async listAll() {
        return this.formationService.findAllWithSessions();
    }
};
exports.FormationController = FormationController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_formation_dto_1.CreateFormationDto]),
    __metadata("design:returntype", void 0)
], FormationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FormationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FormationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_formation_dto_1.UpdateFormationDto]),
    __metadata("design:returntype", void 0)
], FormationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FormationController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('oneSession'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FormationController.prototype, "findOneWithSessions", null);
__decorate([
    (0, common_1.Get)('allSessions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FormationController.prototype, "listAll", null);
exports.FormationController = FormationController = __decorate([
    (0, common_1.Controller)('formation'),
    __metadata("design:paramtypes", [formation_service_1.FormationService])
], FormationController);
//# sourceMappingURL=formation.controller.js.map