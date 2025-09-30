import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule } from '../clients/clients.module';
import { SmsModule } from 'src/commons/providers/sms/sms.module';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigsModule } from 'src/configs';
// import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [ClientsModule, SmsModule, ConfigsModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
