import { Module } from '@nestjs/common';
import { FormationService } from '@/modules/formation/formation.service';
import { FormationController } from '@/modules/formation/formation.controller';
import { SessionsModule } from '@/modules/sessions/sessions.module';
import { FsbackModule } from '@/commons/providers/fsback/fsback.module';

@Module({
  imports: [
    SessionsModule,
    FsbackModule
  ],
  controllers: [FormationController],
  providers: [FormationService, ],
  exports: [FormationService],
})
export class FormationModule {}
