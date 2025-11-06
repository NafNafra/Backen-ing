import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormationService } from '@/modules/formation/formation.service';
import { FormationController } from '@/modules/formation/formation.controller';
import { Formation, FormationSchema } from '@/modules/formation/entities/formation.entity';
import { SessionsModule } from '@/modules/sessions/sessions.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Formation.name, schema: FormationSchema },
    ]),
    SessionsModule,
  ],
  controllers: [FormationController],
  providers: [FormationService],
  exports: [FormationService],
})
export class FormationModule {}
