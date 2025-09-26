import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserDocumentSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserDocument.name, schema: UserDocumentSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
