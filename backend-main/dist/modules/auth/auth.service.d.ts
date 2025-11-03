import { JwtService } from '@nestjs/jwt';
import { ClientsService } from '../clients/clients.service';
import { SmsService } from 'src/commons/providers/sms/sms.service';
import { ConfigsService } from 'src/configs';
import { payload } from 'src/commons/types/auth';
import { AuthResponse } from './dto/response.dto';
import { CreateAuthPhoneDto } from './dto/create-auth.dto';
export declare class AuthService {
    private readonly clientsService;
    private readonly smsService;
    private readonly configsService;
    private readonly jwtService;
    constructor(clientsService: ClientsService, smsService: SmsService, configsService: ConfigsService, jwtService: JwtService);
    connexionClient(phoneAuth: CreateAuthPhoneDto): Promise<{
        message: string;
    }>;
    verifyOtp(phoneAuth: CreateAuthPhoneDto, code: string): Promise<AuthResponse>;
    resendCode(phoneAuth: CreateAuthPhoneDto): Promise<{
        message: string;
    }>;
    generateTokens(payload: payload): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    private storeRefreshToken;
    refreshAccessToken(refreshToken: string): Promise<{
        access_token: string;
    }>;
    logout(userId: string): Promise<void>;
}
