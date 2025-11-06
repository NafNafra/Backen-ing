import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionsService } from '@/modules/sessions/sessions.service';
import { SessionsController } from '@/modules/sessions/sessions.controller';
import { Sessions, SessionsSchema } from '@/modules/sessions/entities/session.entity';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sessions.name, schema: SessionsSchema },
    ]),
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
