import { Injectable, Param } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! yeah';
  }

  startHome(id: number): string {
    if (id >=18) return 'Home page' + id;
    return "null"
  }
}
