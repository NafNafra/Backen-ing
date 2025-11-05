/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../../commons/guards/jwt-auth.guard'; //jwt-auth.guard
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateAuthPhoneDto } from '../auth/dto/create-auth.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('phone')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findByPhone(@Query('phone') phone: CreateAuthPhoneDto) {
    return this.usersService.findByPhone(phone);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Request() req) {
    const id = req.user.id;
    return this.usersService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') _id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(_id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
