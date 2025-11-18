import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigsModule } from 'src/configs';
import { FsCustomerService } from '@/commons/providers/fsback/fs-customer.service';
import { CreateAuthPhoneDto } from '@/modules/auth/dto/create-auth.dto';
import { FsFormationService } from '@/commons/providers/fsback/fs-formation.service';
import { FsPayementService } from '@/commons/providers/fsback/fs-payement.service';
import { FsCertService } from '@/commons/providers/fsback/fs-cert.service';

@Module({
  imports: [
    HttpModule,
    ConfigsModule,
    CreateAuthPhoneDto
  ],
  providers: [
    FsCustomerService,
    FsFormationService,
    FsPayementService,
    FsCertService,
  ],
  exports: [
    FsCustomerService,
    FsFormationService,
    FsPayementService,
    FsCertService,
  ]
})
export class FsbackModule { }
