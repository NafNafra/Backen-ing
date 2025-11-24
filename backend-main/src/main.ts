import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const config = new DocumentBuilder()
    .setTitle('Client API')
    .setDescription('CRUD API for Clients')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('/api')  
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, documentFactory);

  if (process.env.NODE_ENV !== 'production') {
    writeFileSync('./swagger.json', JSON.stringify(documentFactory, null, 2));
    console.log('✔ Swagger JSON generated at ./swagger.json');
  }

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
  console.log(`This application is running on port : ${await app.getUrl()}`);
}

bootstrap();
