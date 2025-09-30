import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigsService } from './configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })

  const config = new DocumentBuilder()
    .setTitle('Client API')
    .setDescription('CRUD API for Clients')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, documentFactory); // Swagger accessible sur /api

  const configsService = app.get(ConfigsService);


  //add 'api' to all routes
  app.setGlobalPrefix('api');


  await app.listen(process.env.PORT ?? 3000);
  console.log(`This application is running on port : ${await app.getUrl()}`);

}
bootstrap();
