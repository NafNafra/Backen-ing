import { Module } from '@nestjs/common';
import { ContactService } from '@/modules/contact/contact.service';
import { ContactController } from '@/modules/contact/contact.controller';
import { SmsModule } from 'src/commons/providers/sms/sms.module';

@Module({
  imports: [SmsModule],
  controllers: [ContactController],
  providers: [ContactService, SmsModule],
  exports: [ContactService],
})
export class ContactModule {}
