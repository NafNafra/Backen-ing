import { Controller, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('number')
  loginClient(@Body('phone') phone: string) {
    return this.authService.connexionClient(phone)
  }

  @Post('code')
  verifyCode(@Body('phone') phone: string, @Body('code') code: string) {
    return this.authService.verify2Fa(phone, code);
  }

  @Post('resend')
  resendCode(@Query('phone') phone: string) {
    return this.authService.resendCode(phone);
  }

  @Post('refresh')
  async refresh(@Query('refreshToken') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }


  @Post('deconnexion')
  async deconnexion(@Query('id') id: string) {
    return this.authService.logout(id);
  }
}

