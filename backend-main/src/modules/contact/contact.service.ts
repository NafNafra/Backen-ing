import { Injectable, OnModuleInit } from '@nestjs/common';
import { ContactToFs } from './dto/contact-to-fs.dto';
import { SmsService } from 'src/commons/providers/sms/sms.service';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ContactService implements OnModuleInit {
  private clientFs: ClientProxy;

  onModuleInit() {
    this.clientFs = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 4001,
      },
    });
  }

  sendMessageToFsViaMicroservice(name: string) {
    return this.clientFs.send({ cmd: 'greet' }, name);
  }

  constructor(private readonly smsService: SmsService) {}

  async sendMessageToFs(contactFs: ContactToFs) {
    const { nom, numero, message } = contactFs;
    const contenu = `Nouveau message de ${nom} avec numero ${numero}\n'${message}'`;
    await this.smsService.sendSmsToFs(numero, contenu);
    return {
      message: 'Message envoyee a FS avec success',
    };
  }
}
