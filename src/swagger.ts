// src/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NestFactory } from '@nestjs/core';  // Corrigido
import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API for managing customers',
      },
    },
    // Caminho dos arquivos com comentários JSDoc
    apis: ['./src/**/*.controller.ts'],
  };

  const specs = swaggerJsdoc(options);

  // Usando o swagger-ui-express para exibir a interface Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

  await app.listen(3000);
}
bootstrap();
