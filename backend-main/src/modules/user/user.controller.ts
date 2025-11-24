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
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/commons/guards/jwt-auth.guard';
import { CreateAuthPhoneDto } from '@/modules/auth/dto/create-auth.dto';
import { UsersService } from '@/modules/user/user.service';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import { UpdateUserDto } from '@/modules/user/dto/update-user.dto';
import { Types } from 'mongoose';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('phone')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  findByPhone(@Body('phone') phone: CreateAuthPhoneDto) {
    return this.usersService.findByPhone(phone);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Request() req) {
    const id = req.user.id;
    console.log("Me : ", id)
    return this.usersService.findByUserId(id);
  }

  @Patch(':id')
  update(@Param('id') _id: Types.ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(_id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
