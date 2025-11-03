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
exports.FormationSchema = exports.Formation = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Formation = class Formation {
    titre;
    description;
    duree;
    resume;
    creationDate;
    sessions;
};
exports.Formation = Formation;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Formation.prototype, "titre", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Formation.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Formation.prototype, "duree", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Formation.prototype, "resume", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Formation.prototype, "creationDate", void 0);
exports.Formation = Formation = __decorate([
    (0, mongoose_1.Schema)()
], Formation);
exports.FormationSchema = mongoose_1.SchemaFactory.createForClass(Formation);
exports.FormationSchema.virtual('sessions', {
    ref: "Sessions",
    localField: "_id",
    foreignField: "formationId"
});
exports.FormationSchema.set('toObject', { virtuals: true });
exports.FormationSchema.set('toJSON', { virtuals: true });
//# sourceMappingURL=formation.entity.js.map