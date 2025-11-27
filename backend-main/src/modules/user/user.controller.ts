import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/commons/guards/jwt-auth.guard';
import { CreateAuthPhoneDto } from '@/modules/auth/dto/create-auth.dto';
import { UsersService } from '@/modules/user/user.service';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import { UpdateUserDto } from '@/modules/user/dto/update-user.dto';
import { Types } from 'mongoose';
import { CreateUserResponseDto, UserResponseDto } from './dto/response-user.dto';
import { UpdateUserResponseDto } from './dto/response-user.dto';
import { ResponseRegisterDto } from '../register/dto/response-register.dto';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({
    description: 'User created successfully',
    type: CreateUserResponseDto
  })
  @ApiBadRequestResponse({ description: 'Payload invalid' })
  async create(
    @Body() dto: CreateUserDto
  ): Promise<CreateUserResponseDto> {
    return await this.usersService.createUser(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'Users found successfully',
    type: [CreateUserResponseDto]
  })
  async findAll(): Promise<CreateUserResponseDto[]> {
    return this.usersService.findAll();
  }

  @Get('phone')
  @ApiOperation({ summary: 'Find user by phone number' })
  @ApiOkResponse({
    description: 'Users found successfully',
    type: CreateUserResponseDto,
    isArray: true
  })
  @ApiBadRequestResponse({ description: 'Payload invalid' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findByPhone(@Query('phoneNumber') phoneNumber: CreateAuthPhoneDto) {
    return await this.usersService.findByPhone(phoneNumber);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'User found successfully',
    type: ResponseRegisterDto
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  findOne(@Request() req): Promise<ResponseRegisterDto> {
    return this.usersService.findByUserId(req.user._id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiOkResponse({
    description: 'User updated successfully',
    type: UpdateUserResponseDto
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiNotFoundResponse({ description: 'User not found' })
  update(
    @Param('id') _id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UpdateUserResponseDto> {
    return this.usersService.update(_id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiOkResponse({
    description: 'User deleted successfully',
    type: CreateUserResponseDto
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiNotFoundResponse({ description: 'User not found' })
  remove(@Param('id') id: string): Promise<CreateUserResponseDto> {
    return this.usersService.remove(id);
  }
}
