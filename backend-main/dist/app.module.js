"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./modules/user/user.module");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./modules/auth/auth.module");
const sms_module_1 = require("./commons/providers/sms/sms.module");
const configs_module_1 = require("./configs/configs.module");
const contact_module_1 = require("./modules/contact/contact.module");
const formation_module_1 = require("./modules/formation/formation.module");
const sessions_module_1 = require("./modules/sessions/sessions.module");
const certificats_module_1 = require("./modules/certificats/certificats.module");
const bridge_module_1 = require("./modules/bridge/bridge.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/mydb'),
            bridge_module_1.BridgeModule,
            auth_module_1.AuthModule,
            user_module_1.UsersModule,
            sms_module_1.SmsModule,
            configs_module_1.ConfigsModule,
            contact_module_1.ContactModule,
            formation_module_1.FormationModule,
            sessions_module_1.SessionsModule,
            certificats_module_1.CertificatsModule,
            axios_1.HttpModule,
            bridge_module_1.BridgeModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map