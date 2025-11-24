import { Controller, Post, Query, Body } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { CreateAuthPhoneDto, LogOutDto, RefreshTokenDto, VerifingCodeDto } from '@/modules/auth/dto/create-auth.dto';
import { LoginChosenUserDto } from '@/modules/auth/dto/login-chosen-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('get-code')
  loginClient(@Body() phoneNumber: CreateAuthPhoneDto) {
    return this.authService.lookByPhone(phoneNumber);
  }

  @Post('verify-code')
  verifyCode(
    @Body() dto: VerifingCodeDto,
  ) {
    return this.authService.verifyOtp(dto);
  }

  @Post('resend-code')
  resendCode(@Body() phoneNumber: CreateAuthPhoneDto) {
    return this.authService.resendCode(phoneNumber);
  }

  @Post('login')
  loginChosenUser(@Body() student: LoginChosenUserDto) {
    return this.authService.loginChosenUser(student)
  }

  @Post('new-token')
  async refresh(@Body() refreshToken: RefreshTokenDto) {
    return this.authService.refreshAccessToken(refreshToken);
  }

  @Post('logout')
  async deconnexion(@Body() id: LogOutDto) {
    return this.authService.logout(id);
  }
}
