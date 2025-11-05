import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../user/user.module';
import { SmsModule } from 'src/commons/providers/sms/sms.module';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigsModule } from 'src/configs';
import { JwtStrategy } from '../../commons/jwt-strategy/jwt.strategy';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    SmsModule,
    PassportModule,
    ConfigsModule,
    JwtModule.register({
      secret: process.env.JWT_TOKEN,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
