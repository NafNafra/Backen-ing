import { Module } from '@nestjs/common';
import { FsUrlService } from './fs-url.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigsModule } from '@/configs';

@Module({
  imports: [
    HttpModule,
    ConfigsModule,
  ],
  providers: [FsUrlService],
  exports: [FsUrlService],
})
export class FsUrlModule { }
