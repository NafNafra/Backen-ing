import { ApiTags, ApiOperation, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from '@/modules/register/register.service';
import { CreateRegisterDto } from '@/modules/register/dto/create-register.dto';
import { ResponseRegisterDto } from '@/modules/register/dto/response-register.dto';

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
