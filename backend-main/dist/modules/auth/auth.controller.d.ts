import { AuthService } from './auth.service';
import { CreateAuthPhoneDto } from './dto/create-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginClient(phoneAuth: CreateAuthPhoneDto): Promise<{
        message: string;
    }>;
    verifyCode(phoneAuth: CreateAuthPhoneDto, code: string): Promise<import("./dto/response.dto").AuthResponse>;
    resendCode(phoneAuth: CreateAuthPhoneDto): Promise<{
        message: string;
    }>;
    refresh(refreshToken: string): Promise<{
        access_token: string;
    }>;
    deconnexion(id: string): Promise<void>;
}
