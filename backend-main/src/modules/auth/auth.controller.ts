import { Controller, Post, Query, Body } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { CreateAuthPhoneDto } from '@/modules/auth/dto/create-auth.dto';
import { LoginChosenUserDto } from '@/modules/auth/dto/login-chosen-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('get-code')
  loginClient(@Query('phoneNumber') phoneAuth: CreateAuthPhoneDto) {
    return this.authService.lookByPhone(phoneAuth);
  }

  @Post('verify-code')
  verifyCode(
    @Query('phoneNumber') phoneAuth: CreateAuthPhoneDto,
    @Query('code') code: string,
  ) {
    return this.authService.verifyOtp(phoneAuth, code);
  }

  @Post('resend-code')
  resendCode(@Query('phoneNumber') phoneAuth: CreateAuthPhoneDto) {
    return this.authService.resendCode(phoneAuth);
  }

  @Post('login')
  loginChosenUser(@Body() student: LoginChosenUserDto) {
    return this.authService.loginChosenUser(student)
  }

  @Post('new-token')
  async refresh(@Query('refreshToken') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }

  @Post('logout')
  async deconnexion(@Query('id') id: Types.ObjectId) {
    return this.authService.logout(id);
  }
}
