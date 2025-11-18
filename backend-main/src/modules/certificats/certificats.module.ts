import { Module } from '@nestjs/common';
import { CertificatsService } from '@/modules/certificats/certificats.service';
import { CertificatsController } from '@/modules/certificats/certificats.controller';
import { Certificat, CertificatSchema } from '@/modules/certificats/entities/certificat.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { FsbackModule } from '@/commons/providers/fsback/fsback.module';
import { FsCertService } from '@/commons/providers/fsback/fs-cert.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Certificat.name, schema: CertificatSchema },
    ]),
    FsbackModule
  ],
  controllers: [CertificatsController],
  providers: [
    CertificatsService,
  ],
  exports: [CertificatsService],
})
export class CertificatsModule {}
