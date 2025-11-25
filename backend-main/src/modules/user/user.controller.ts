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

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ description: 'User created successfully' })
  @ApiBadRequestResponse({ description: 'Payload invalid' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Users found successfully' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('phone')
  @ApiOperation({ summary: 'Find user by phone number' })
  @ApiOkResponse({ description: 'Users found successfully' })
  @ApiBadRequestResponse({ description: 'Payload invalid' })
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  findByPhone(
    @Query() phone: CreateAuthPhoneDto) {
    return this.usersService.findByPhone(phone);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User found successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  findOne(@Request() req) {
    const id = req.user.id;
    // console.log("Me : ", id)
    return this.usersService.findByUserId(req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiOkResponse({ description: 'User updated successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  update(@Param('id') _id: Types.ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(_id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiOkResponse({ description: 'User deleted successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
