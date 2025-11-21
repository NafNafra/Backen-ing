import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigsModule } from 'src/configs';
import { UsersService } from '@/modules/user/user.service';
import { UsersController } from '@/modules/user/user.controller';
import { User, UserSchema } from '@/modules/user/entities/user.entity';
import { FsbackModule } from '@/commons/providers/fsback/fsback.module';
import { FsCustomerService } from '@/commons/providers/fsback/fs-customer.service';
import { RegisterModule } from '../register/register.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HttpModule,
    ConfigsModule,
    FsbackModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, FsCustomerService],
  exports: [UsersService],
})
export class UsersModule {}
