import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('number')
  loginClient(@Query('phone') phone: string) {
    return this.authService.connexionClient(phone)
  }

  @Get('code')
  verifyCode(@Query('phone') phone: string, @Query('code') code: string) {
    return this.authService.verify2Fa(phone, code);
  }

  @Get('resend')
  resendCode(@Query('phone') phone: string) {
    return this.authService.resendCode(phone);
  }
}

