import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { FsbackModule } from '@/commons/providers/fsback/fsback.module';

@Module({
  imports:[FsbackModule],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
