import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: process.env.PORT ? parseInt(process.env.PORT) : 3001,
      },
    }
  );
  await app.listen();
  console.log(`Microservice is listening on port ${process.env.PORT ? parseInt(process.env.PORT) : 3001}`);
}
bootstrap();
