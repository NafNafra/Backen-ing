import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './entities/client.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    HttpModule,
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService]
})
export class ClientsModule { }
