import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormationService } from './formation.service';
import { FormationController } from './formation.controller';
import { Formation, FormationSchema } from './entities/formation.entity';
import { SessionsModule } from '../sessions/sessions.module';

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
