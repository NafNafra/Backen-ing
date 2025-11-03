"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigsModule = void 0;
const common_1 = require("@nestjs/common");
const configs_service_1 = require("./configs.service");
const config_1 = require("@nestjs/config");
const configuration_1 = __importDefault(require("./configuration"));
let ConfigsModule = class ConfigsModule {
};
exports.ConfigsModule = ConfigsModule;
exports.ConfigsModule = ConfigsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                envFilePath: '.env',
                isGlobal: true
            })
        ],
        providers: [configs_service_1.ConfigsService],
        exports: [configs_service_1.ConfigsService]
    })
], ConfigsModule);
//# sourceMappingURL=configs.module.js.map