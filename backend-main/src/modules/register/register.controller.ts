import { ApiTags, ApiOperation, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';

@ApiTags('register')
@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new registration' })
  @ApiCreatedResponse({ description: 'Registration created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  create(@Body() createRegisterDto: CreateRegisterDto) {
    return this.registerService.create(createRegisterDto);
  }
}
