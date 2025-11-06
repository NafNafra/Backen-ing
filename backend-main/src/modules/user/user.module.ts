import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigsModule } from 'src/configs';
import { UsersService } from '@/modules/user/user.service';
import { UsersController } from '@/modules/user/user.controller';
import { User, UserSchema } from '@/modules/user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HttpModule,
    ConfigsModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
