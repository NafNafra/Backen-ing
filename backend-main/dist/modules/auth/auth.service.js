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
const user_service_1 = require("../user/user.service");
const utils_1 = require("../../commons/utils");
const sms_service_1 = require("../../commons/providers/sms/sms.service");
const configs_1 = require("../../configs");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    usersService;
    smsService;
    configsService;
    jwtService;
    constructor(usersService, smsService, configsService, jwtService) {
        this.usersService = usersService;
        this.smsService = smsService;
        this.configsService = configsService;
        this.jwtService = jwtService;
    }
    async lookByPhone(phoneAuth) {
        const users = await this.usersService.findByPhone(phoneAuth);
        if (!users || users.length === 0) {
            throw new common_1.NotFoundException(`User with phone ${phoneAuth}+ found`);
        }
        const OtpCode = (0, utils_1.generateOtpCode)();
        const OtpExpiresAt = (0, utils_1.setOtpExpiryTime)();
        for (const user of users) {
            user._OtpCode = OtpCode;
            user._OtpExpiresAt = OtpExpiresAt;
            await user.save();
        }
        await this.smsService.sendSms(phoneAuth.toString(), `Votre code de vérification est: ${OtpCode}`);
        return {
            message: `Le code de vérification a été envoyé au numéro: ${phoneAuth}. Le code ${OtpCode} expirera dans 10 minutes `,
        };
    }
    async verifyOtp(phoneAuth, code) {
        const users = await this.usersService.findByPhone(phoneAuth);
        if (!users) {
            throw new common_1.NotFoundException(`User with phone ${phoneAuth} not found`);
        }
        const validOtpUser = users.find((u) => u._OtpCode === code &&
            new Date(u._OtpExpiresAt).getTime() > Date.now());
        if (!validOtpUser) {
            throw new common_1.BadRequestException('Code OTP invalide ou expiré');
        }
        for (const u of users) {
            u._OtpCode = '';
            u._OtpExpiresAt = '';
            await u.save();
        }
        return {
            message: `Code vérifié. Sélectionnez l'utilisateur à connecter. `,
            user: users.map((u) => ({
                id: u._id,
                name: u.name,
                phoneNumber: u.phoneNumber,
                activated: u.activated,
            })),
            statusCode: common_1.HttpStatus.OK
        };
    }
    async resendCode(phoneAuth) {
        const users = await this.usersService.findByPhone(phoneAuth);
        if (!users || users.length === 0) {
            throw new common_1.NotFoundException(`User with phone ${phoneAuth} not found`);
        }
        for (const user of users) {
            user._OtpCode = '';
            user._OtpExpiresAt = '';
            await user.save();
        }
        return this.lookByPhone(phoneAuth);
    }
    async loginChosenUser(userId, phoneNumber) {
        const users = await this.usersService.findByPhone(phoneNumber);
        if (!users) {
            throw new common_1.NotFoundException(`User with phone ${phoneNumber} not found`);
        }
        const validOtpUser = users.find((u) => {
            if (u._id === userId) {
                return u;
            }
        });
        if (!validOtpUser) {
            throw new common_1.NotFoundException('Utilisateur non validé');
        }
        validOtpUser.activated = true;
        await validOtpUser.save();
        const user = await this.usersService.findById(userId);
        const payload = {
            id: user.id,
            phone: user.phoneNumber,
            activated: user.activated,
        };
        const token = await this.generateTokens(payload);
        await this.storeRefreshToken(user.id.toString(), token.refresh_token);
        return {
            user: [{
                    id: user.id,
                    name: user.name,
                    phoneNumber: user.phoneNumber,
                    activated: user.activated
                }],
            message: 'Connexion réussie',
            statusCode: common_1.HttpStatus.OK,
            accessToken: token.access_token,
            refreshToken: token.refresh_token,
        };
    }
    async logout(userId) {
        await this.usersService.update(userId, { refreshToken: null, activated: false });
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
        await this.usersService.update(userId, { refreshToken: hashedToken, activated: true });
    }
    async refreshAccessToken(refreshToken) {
        const payload = this.jwtService.verify(refreshToken, {
            secret: this.configsService.get('jwt.refresh.secret'),
        });
        const user = await this.usersService.findById(payload.id);
        if (!user || !user.refreshToken)
            throw new common_1.UnauthorizedException('Invalid refresh token ko');
        const isTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!isTokenValid)
            throw new common_1.UnauthorizedException('Invalid refresh token');
        const newAccessToken = await this.jwtService.signAsync({ id: user.id, phoneNumber: user.phoneNumber, activated: user.activated }, {
            secret: this.configsService.get('jwt.secret'),
            expiresIn: this.configsService.get('jwt.expiresIn'),
        });
        return { access_token: newAccessToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UsersService,
        sms_service_1.SmsService,
        configs_1.ConfigsService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map