import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@/modules/user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { SmsModule } from '@/commons/providers/sms/sms.module';
import { ConfigsModule } from '@/configs/configs.module';
import { ContactModule } from '@/modules/contact/contact.module';
import { FormationModule } from '@/modules/formation/formation.module';
import { SessionsModule } from '@/modules/sessions/sessions.module';
import { CertificatsModule } from '@/modules/certificats/certificats.module';
import { RegisterModule } from './modules/register/register.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/mydb',
    ),
    AuthModule,
    UsersModule,
    SmsModule,
    ConfigsModule,
    ContactModule,
    FormationModule,
    SessionsModule,
    CertificatsModule,
    HttpModule,
    RegisterModule,
  ],
})
export class AppModule { }
