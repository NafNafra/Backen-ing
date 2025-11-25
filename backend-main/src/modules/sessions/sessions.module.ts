import { Module } from '@nestjs/common';
import { SessionsService } from '@/modules/sessions/sessions.service';
import { SessionsController } from '@/modules/sessions/sessions.controller';
import { FsbackModule } from '@/commons/providers/fsback/fsback.module';
@Module({
  imports: [

    FsbackModule,
  ],
  controllers: [SessionsController],
  providers: [SessionsService,],
  exports: [SessionsService],
})
export class SessionsModule { }
