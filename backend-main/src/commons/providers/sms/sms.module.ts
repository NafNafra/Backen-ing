import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SmsService } from '@/commons/providers/sms/sms.service';
import { ConfigsModule } from '@/configs';

@Module({
  imports: [HttpModule, ConfigsModule],
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule {}
