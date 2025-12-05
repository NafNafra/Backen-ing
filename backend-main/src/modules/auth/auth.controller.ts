import { Controller, Post, Res, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { CreateAuthPhoneDto, LogOutDto, TokenDto, VerifingCodeDto } from '@/modules/auth/dto/create-auth.dto';
import { LoginChosenUserDto } from '@/modules/auth/dto/login-chosen-user.dto';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoginResponseDto, MessageResponseDto, VerifyCodeResponseDto } from '@/modules/auth/dto/response.dto';
import { JwtAuthGuard } from '@/commons/guards/jwt-auth.guard';
import type { Response } from 'express';
import type { Request } from 'express';
import { ConfigsService } from '@/configs';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configsService: ConfigsService,
  ) { }

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
  @ApiOkResponse({
    description: 'Login successful',
    type: LoginResponseDto
  })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  async loginChosenUser(
    @Body() student: LoginChosenUserDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<LoginResponseDto> {
    const data = await this.authService.loginChosenUser(student)
    return data
  }

  @Post('new-token')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiOkResponse({
    description: 'Token refreshed successfully',
    type: TokenDto
  })
  @ApiBadRequestResponse({ description: 'Invalid refresh token' })
  async refresh(
    @Body() token: TokenDto,
  ): Promise<TokenDto> {
    const access_token = await this.authService.refreshAccessToken(token);
    return access_token;
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiOkResponse({
    description: 'Logged out successfully',
    type: MessageResponseDto
  })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deconnexion(
    @Req() req: Request & { user: any },
  ): Promise<MessageResponseDto> {
    const id = req.user._id;
    return this.authService.logout(id);
  }


}
