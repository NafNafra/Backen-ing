import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigsModule } from 'src/configs';
import { FsbackService } from './fsback.service';
import { CreateAuthPhoneDto } from '@/modules/auth/dto/create-auth.dto';

@Module({
  imports:[HttpModule, ConfigsModule, CreateAuthPhoneDto],
  providers: [FsbackService],
  exports:[FsbackService]
})
export class FsbackModule {}
