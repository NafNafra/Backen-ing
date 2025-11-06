import { Module } from '@nestjs/common';
import { CertificatsService } from '@/modules/certificats/certificats.service';
import { CertificatsController } from '@/modules/certificats/certificats.controller';
import { Certificat, CertificatSchema } from '@/modules/certificats/entities/certificat.entity';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Certificat.name, schema: CertificatSchema },
    ]),
  ],
  controllers: [CertificatsController],
  providers: [CertificatsService],
  exports: [CertificatsService],
})
export class CertificatsModule {}
