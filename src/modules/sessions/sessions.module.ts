import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { Sessions, SessionsSchema } from './entities/session.entity';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sessions.name, schema: SessionsSchema }])
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
  exports:[SessionsService]
})
export class SessionsModule { }
