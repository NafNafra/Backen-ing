import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/user.service';
import { SmsService } from 'src/commons/providers/sms/sms.service';
import { ConfigsService } from 'src/configs';
import { payload } from 'src/commons/types/auth';
import { AuthResponse } from './dto/response.dto';
import { CreateAuthPhoneDto } from './dto/create-auth.dto';
import { Types } from 'mongoose';
export declare class AuthService {
    private readonly usersService;
    private readonly smsService;
    private readonly configsService;
    private readonly jwtService;
    constructor(usersService: UsersService, smsService: SmsService, configsService: ConfigsService, jwtService: JwtService);
    lookByPhone(phoneAuth: CreateAuthPhoneDto): Promise<{
        message: string;
    }>;
    verifyOtp(phoneAuth: CreateAuthPhoneDto, code: string): Promise<AuthResponse>;
    resendCode(phoneAuth: CreateAuthPhoneDto): Promise<{
        message: string;
    }>;
    loginChosenUser(userId: Types.ObjectId, phoneNumber: CreateAuthPhoneDto): Promise<AuthResponse>;
    logout(userId: string): Promise<void>;
    generateTokens(payload: payload): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    private storeRefreshToken;
    refreshAccessToken(refreshToken: string): Promise<{
        access_token: string;
    }>;
}
