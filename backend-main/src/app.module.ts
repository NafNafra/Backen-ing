import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { SmsModule } from './commons/providers/sms/sms.module';
import { ConfigsModule } from './configs/configs.module';
import { ContactModule } from './modules/contact/contact.module';
import { FormationModule } from './modules/formation/formation.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { CertificatsModule } from './modules/certificats/certificats.module';
import { UserService } from './service/user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/mydb'),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',  // Nom du microservice
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3001 }, // le port de backend-entreprise-fs
      },
    ]),
    AuthModule,
    UsersModule,
    SmsModule,
    ConfigsModule,
    ContactModule,
    FormationModule,
    SessionsModule,
    CertificatsModule,
    HttpModule,
  ],
  providers: [UserService],
})
export class AppModule { }
