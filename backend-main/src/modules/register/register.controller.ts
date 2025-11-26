import { ApiTags, ApiOperation, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { ResponseRegisterDto } from './dto/response-register.dto';

@ApiTags('Register')
@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new registration' })
  @ApiCreatedResponse({
    description: 'Registration created successfully',
    type: ResponseRegisterDto
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async create(
    @Body() dto: CreateRegisterDto
  ): Promise<ResponseRegisterDto> {
    return await this.registerService.create(dto);
  }
}
