import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { ConfigsService } from './configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 const configService = app.get(ConfigsService);

  app.enableCors({
    origin: '*',
    // credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const config = new DocumentBuilder()
    .setTitle('Client API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, documentFactory);

  app.use('/api-json', (req, res) => {
    res.json(documentFactory);
  });

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log(`This application is running on port : ${await app.getUrl()}`);
}

bootstrap();
