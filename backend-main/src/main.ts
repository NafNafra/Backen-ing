import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const config = new DocumentBuilder()
    .setTitle('Client API')
    .setDescription('CRUD API for Clients - Backend service for managing client authentication, users, registrations, formations, sessions, and certificates')
    .setVersion('1.0')
    .setContact('API Support', 'http://localhost:3000', 'nafafy@gmail.com')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addBearerAuth()
    // .addServer('/api', 'API Base Path')
    .addServer('http://localhost:3000', 'Local Development')
    .addTag('auth', 'Authentication endpoints for phone-based login')
    .addTag('Users', 'User management endpoints')
    .addTag('Register', 'User registration endpoints')
    .addTag('Formation', 'Formation/Training management')
    .addTag('Sessions', 'Session management')
    .addTag('Certificats', 'Certificate management')
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, documentFactory);

  app.use('/api-json', (req, res) => {          // 📌 Raw JSON endpoint
    res.json(documentFactory);
  });
  app.use(cookieParser()); // <-- Missing step
  // writeFileSync('./swagger.json', JSON.stringify(documentFactory, null, 2));
  // console.log('✔ Swagger JSON generated at ./swagger.json');

  // app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
  console.log(`This application is running on port : ${await app.getUrl()}`);
}

bootstrap();
