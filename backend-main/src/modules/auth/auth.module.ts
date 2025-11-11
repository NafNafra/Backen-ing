import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigsModule } from '@/configs';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '@/modules/auth/auth.service';
import { AuthController } from '@/modules/auth/auth.controller';
import { SmsModule } from '@/commons/providers/sms/sms.module';
import { JwtStrategy } from '@/commons/jwt-strategy/jwt.strategy';
import { UsersModule } from '@/modules/user/user.module';
import { FsbackModule } from '@/commons/providers/fsback/fsback.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    SmsModule,
    PassportModule,
    ConfigsModule,
    FsbackModule,
    JwtModule.register({
      secret: process.env.JWT_TOKEN,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
