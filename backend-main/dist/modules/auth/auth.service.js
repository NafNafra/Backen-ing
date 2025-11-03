"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const clients_service_1 = require("../clients/clients.service");
const utils_1 = require("../../commons/utils");
const sms_service_1 = require("../../commons/providers/sms/sms.service");
const configs_1 = require("../../configs");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    clientsService;
    smsService;
    configsService;
    jwtService;
    constructor(clientsService, smsService, configsService, jwtService) {
        this.clientsService = clientsService;
        this.smsService = smsService;
        this.configsService = configsService;
        this.jwtService = jwtService;
    }
    async connexionClient(phoneAuth) {
        const user = await this.clientsService.findByPhone(phoneAuth);
        if (!user) {
            throw new common_1.NotFoundException(`Client with phone ${phoneAuth}+ found`);
        }
        user._OtpCode = (0, utils_1.generateOtpCode)();
        user._OtpExpiresAt = (0, utils_1.setOtpExpiryTime)();
        await user.save();
        await this.smsService.sendSms(user.phoneNumber, `Votre code de vérification est: ${user._OtpCode}`);
        return {
            message: `Le code de vérification a été envoyé au numéro: ${phoneAuth}. Le code ${user._OtpCode} expirera dans 10 minutes `,
        };
    }
    async verifyOtp(phoneAuth, code) {
        const user = await this.clientsService.findByPhone(phoneAuth);
        if (!user) {
            throw new common_1.NotFoundException(`Client with phone ${phoneAuth} not found`);
        }
        if (code !== user._OtpCode) {
            throw new common_1.NotFoundException(`Code : ${user._OtpCode} for ${phoneAuth}`);
        }
        user._OtpCode = '';
        user._OtpExpiresAt = '';
        user.activated = true;
        await user.save();
        const payload = {
            id: user._id,
            phone: user.phoneNumber,
            activated: user.activated,
        };
        const token = await this.generateTokens(payload);
        await this.storeRefreshToken(user._id, token.refresh_token);
        return {
            user: { name: user.name, phoneNumber: user.phoneNumber },
            message: 'Connexion avec succes',
            statusCode: common_1.HttpStatus.OK,
            accessToken: token.access_token,
            refreshToken: token.refresh_token,
        };
    }
    async resendCode(phoneAuth) {
        const user = await this.clientsService.findByPhone(phoneAuth);
        if (!user) {
            throw new common_1.NotFoundException(`Client with phone ${phoneAuth} not found`);
        }
        user._OtpCode = '';
        user._OtpExpiresAt = '';
        return this.connexionClient(phoneAuth);
    }
    async generateTokens(payload) {
        const access_token = await this.jwtService.signAsync(payload, {
            secret: this.configsService.get('jwt.secret'),
            expiresIn: this.configsService.get('jwt.expiresIn'),
        });
        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: this.configsService.get('jwt.refresh.secret'),
            expiresIn: this.configsService.get('jwt.refresh.expiresIn'),
        });
        return { access_token, refresh_token };
    }
    async storeRefreshToken(userId, refreshToken) {
        const hashedToken = await bcrypt.hash(refreshToken, 10);
        await this.clientsService.update(userId, { refreshToken: hashedToken });
    }
    async refreshAccessToken(refreshToken) {
        const payload = this.jwtService.verify(refreshToken, {
            secret: this.configsService.get('jwt.refresh.secret'),
        });
        const user = await this.clientsService.findById(payload.id);
        if (!user || !user.refreshToken)
            throw new common_1.UnauthorizedException('Invalid refresh token');
        const isTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!isTokenValid)
            throw new common_1.UnauthorizedException('Invalid refresh token');
        const newAccessToken = await this.jwtService.signAsync({ id: user.id, phoneNumber: user.phoneNumber, activated: user.activated }, {
            secret: this.configsService.get('jwt.secret'),
            expiresIn: this.configsService.get('jwt.expiresIn'),
        });
        return { access_token: newAccessToken };
    }
    async logout(userId) {
        await this.clientsService.update(userId, { refreshToken: null });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [clients_service_1.ClientsService,
        sms_service_1.SmsService,
        configs_1.ConfigsService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map