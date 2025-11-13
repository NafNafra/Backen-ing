import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigsModule } from 'src/configs';
import { FsCustomerService } from './fs-customer.service';
import { CreateAuthPhoneDto } from '@/modules/auth/dto/create-auth.dto';
import { FsFormationService } from './fs-formation.service';

@Module({
  imports: [HttpModule, ConfigsModule, CreateAuthPhoneDto],
  providers: [FsCustomerService, FsFormationService,],
  exports: [FsCustomerService, FsFormationService,]
})
export class FsbackModule { }
