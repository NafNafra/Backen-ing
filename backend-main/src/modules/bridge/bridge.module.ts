import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE', // Nom du microservice
        transport: Transport.TCP,
        options: { host: 'localhost', port: 4001 },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class BridgeModule {}
