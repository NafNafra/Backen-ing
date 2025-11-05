import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SmsService } from './sms.service';
import { ConfigsModule } from 'src/configs';

@Module({
  imports: [HttpModule, ConfigsModule],
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule {}
