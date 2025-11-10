import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigsModule } from 'src/configs';
import { FsbackService } from './fsback.service';

@Module({
  imports:[HttpModule, ConfigsModule],
  providers: [FsbackService],
  exports:[FsbackService]
})
export class FsbackModule {}
