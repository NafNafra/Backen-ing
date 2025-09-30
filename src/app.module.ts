import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './modules/clients/clients.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { SmsModule } from './commons/providers/sms/sms.module';
import { ConfigsModule } from './configs/configs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/mydb'),
    ClientsModule,
    AuthModule,
    SmsModule,
    ConfigsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
