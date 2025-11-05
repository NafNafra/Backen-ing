import { Controller, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthPhoneDto } from './dto/create-auth.dto';
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
  loginChosenUser(@Query('id') id: Types.ObjectId, @Query('phoneNumber') phoneNumber: CreateAuthPhoneDto) {
    return this.authService.loginChosenUser(id, phoneNumber);
  }

  @Post('new-token')
  async refresh(@Query('refreshToken') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }

  @Post('logout')
  async deconnexion(@Query('id') id: string) {
    return this.authService.logout(id);
  }
}
