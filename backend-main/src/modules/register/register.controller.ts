import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateUserDto } from './dto/create-register.dto';

@ApiTags('register')
@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) { }

  @Post()
  create(@Body() createRegisterDto: CreateUserDto) {
    return this.registerService.create(createRegisterDto);
  }
}
