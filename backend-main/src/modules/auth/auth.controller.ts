import { Controller, Post, Query, Body } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { CreateAuthPhoneDto, LogOutDto, RefreshTokenDto, VerifingCodeDto } from '@/modules/auth/dto/create-auth.dto';
import { LoginChosenUserDto } from '@/modules/auth/dto/login-chosen-user.dto';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { Types } from 'mongoose';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('get-code')
  @ApiOperation({ summary: 'Request OTP code for login' })
  @ApiOkResponse({ description: 'OTP sent successfully' })
  @ApiBadRequestResponse({ description: 'Invalid phone number' })
  loginClient(@Body() phoneNumber: CreateAuthPhoneDto) {
    return this.authService.lookByPhone(phoneNumber);
  }

  @Post('verify-code')
  @ApiOperation({ summary: 'Verify OTP code' })
  @ApiOkResponse({ description: 'Code verified successfully' })
  @ApiBadRequestResponse({ description: 'Invalid code' })
  verifyCode(
    @Body() dto: VerifingCodeDto,
  ) {
    return this.authService.verifyOtp(dto);
  }

  @Post('resend-code')
  @ApiOperation({ summary: 'Resend OTP code' })
  @ApiOkResponse({ description: 'Code resent successfully' })
  @ApiBadRequestResponse({ description: 'Invalid phone number' })
  resendCode(@Body() phoneNumber: CreateAuthPhoneDto) {
    return this.authService.resendCode(phoneNumber);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with chosen user' })
  @ApiOkResponse({ description: 'Login successful' })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  loginChosenUser(@Body() student: LoginChosenUserDto) {
    return this.authService.loginChosenUser(student)
  }

  @Post('new-token')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiOkResponse({ description: 'Token refreshed successfully' })
  @ApiBadRequestResponse({ description: 'Invalid refresh token' })
  async refresh(@Body() refreshToken: RefreshTokenDto) {
    return this.authService.refreshAccessToken(refreshToken);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiOkResponse({ description: 'Logged out successfully' })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  async deconnexion(@Body() id: LogOutDto) {
    return this.authService.logout(id);
  }
}
