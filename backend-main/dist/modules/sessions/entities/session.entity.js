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
exports.SessionsSchema = exports.Sessions = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
let Sessions = class Sessions {
    _id;
    dateDebut;
    dateFin;
    nombrePlace;
    creationDate;
    formationId;
};
exports.Sessions = Sessions;
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: uuid_1.v4 }),
    __metadata("design:type", String)
], Sessions.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Sessions.prototype, "dateDebut", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Sessions.prototype, "dateFin", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Sessions.prototype, "nombrePlace", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Sessions.prototype, "creationDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Formation', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Sessions.prototype, "formationId", void 0);
exports.Sessions = Sessions = __decorate([
    (0, mongoose_1.Schema)()
], Sessions);
exports.SessionsSchema = mongoose_1.SchemaFactory.createForClass(Sessions);
//# sourceMappingURL=session.entity.js.map