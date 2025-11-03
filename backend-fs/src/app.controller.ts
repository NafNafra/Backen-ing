import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) { }
  
  @MessagePattern({ cmd: 'greet' })
  greet(@Payload() name: string): string {
    return this.appService.getHello(name);
  }
}
