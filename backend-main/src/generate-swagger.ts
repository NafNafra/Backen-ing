import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

async function generateSwagger() {
    console.log('🚀 Generating Swagger documentation...');

    const app = await NestFactory.create(AppModule, {
        logger: ['error'], // Minimize logging during generation
    });

    const config = new DocumentBuilder()
        .setTitle('Client API')
        .setDescription('CRUD API for Clients - Backend service for managing client authentication, users, registrations, formations, sessions, and certificates')
        .setVersion('1.0')
        .setContact('API Support', '', 'support@example.com')
        .setLicense('MIT', 'https://opensource.org/licenses/MIT')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Enter JWT token',
                in: 'header',
            },
            'JWT-auth',
        )
        .addServer('/api', 'API Base Path')
        .addServer('http://localhost:3000/api', 'Local Development')
        .addTag('auth', 'Authentication endpoints for phone-based login')
        .addTag('users', 'User management endpoints')
        .addTag('register', 'User registration endpoints')
        .addTag('Formation', 'Formation/Training management')
        .addTag('Sessions', 'Session management')
        .addTag('Certificats', 'Certificate management')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    // Write to file
    writeFileSync('./swagger.json', JSON.stringify(document, null, 2));

    console.log('✅ Swagger JSON generated successfully at ./swagger.json');
    console.log('📝 You can now use this file with API generation tools like:');
    console.log('   - openapi-generator-cli');
    console.log('   - swagger-codegen');
    console.log('   - orval');
    console.log('   - etc.');

    await app.close();
    process.exit(0);
}

generateSwagger().catch((error) => {
    console.error('❌ Error generating Swagger documentation:', error);
    process.exit(1);
});
