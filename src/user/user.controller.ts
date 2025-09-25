import { Controller } from '@nestjs/common';
import { Query, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ParseIntPipe } from '@nestjs/common';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  alc(){
    return this.userService.hello();
  }

  @Get('arp')
  register() {
    return this.userService.register("name", "email", "password", Number(123));
  }

  @Get(':id')
  greeting(@Param('id', ParseIntPipe) id): string {
    return this.userService.startHome(id);
  }


}
