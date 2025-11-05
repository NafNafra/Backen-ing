import { Module } from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { ConfigModule } from '@nestjs/config';
// import { UserService } from '../service/user/user.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  providers: [ConfigsService],
  exports: [ConfigsService],
})
export class ConfigsModule {}
