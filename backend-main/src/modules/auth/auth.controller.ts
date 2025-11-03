import { Controller, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthPhoneDto } from './dto/create-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('number')
  loginClient(@Query('phoneNumber') phoneAuth: CreateAuthPhoneDto) {
    return this.authService.connexionClient(phoneAuth)
  }

  @Post('code')
  verifyCode(@Query('phoneNumber') phoneAuth: CreateAuthPhoneDto, @Query('code') code: string) {
    return this.authService.verifyOtp(phoneAuth, code);
  }

  @Post('resend')
  resendCode(@Query('phone') phoneAuth: CreateAuthPhoneDto) {
    return this.authService.resendCode(phoneAuth);
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

