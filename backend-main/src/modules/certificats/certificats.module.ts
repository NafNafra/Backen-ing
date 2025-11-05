import { Module } from '@nestjs/common';
import { CertificatsService } from './certificats.service';
import { CertificatsController } from './certificats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Certificat, CertificatSchema } from './entities/certificat.entity';

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
