import { Controller, Post, Query, Body } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { CreateAuthPhoneDto, LogOutDto, RefreshTokenDto, VerifingCodeDto } from '@/modules/auth/dto/create-auth.dto';
import { LoginChosenUserDto } from '@/modules/auth/dto/login-chosen-user.dto';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { MessageResponseDto, VerifyCodeResponseDto } from './dto/response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('get-code')
  @ApiOperation({ summary: 'Request OTP code for login' })
  @ApiOkResponse({
    description: 'OTP sent successfully',
    type: MessageResponseDto
  })
  @ApiBadRequestResponse({ description: 'Invalid phone number' })
  async loginClient(
    @Body() phoneNumber: CreateAuthPhoneDto
  ): Promise<MessageResponseDto> {
    return await this.authService.lookByPhone(phoneNumber);
  }

  @Post('resend-code')
  @ApiOperation({ summary: 'Resend OTP code' })
  @ApiOkResponse({
    description: 'Code resent successfully',
    type: MessageResponseDto
  })
  @ApiBadRequestResponse({ description: 'Invalid phone number', })
  async resendCode(
    @Body() phoneNumber: CreateAuthPhoneDto
  ): Promise<MessageResponseDto> {
    return await this.authService.resendCode(phoneNumber);
  }

  @Post('verify-code')
  @ApiOperation({ summary: 'Verify OTP code' })
  @ApiOkResponse({
    description: 'Code verified successfully',
    type: VerifyCodeResponseDto
  })
  @ApiBadRequestResponse({ description: 'Invalid code' })
  async verifyCode(
    @Body() dto: VerifingCodeDto,
  ): Promise<VerifyCodeResponseDto> {
    return await this.authService.verifyOtp(dto);
  }


  @Post('login')
  @ApiOperation({ summary: 'Login with chosen user' })
  @ApiOkResponse({ description: 'Login successful' })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  async loginChosenUser(
    @Body() student: LoginChosenUserDto
  ): Promise<VerifyCodeResponseDto> {
    return await this.authService.loginChosenUser(student)
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
