import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Aplicando o Global Validation Pipe (caso queira validar as entradas, mas vamos deixar sem isso por enquanto)
  // app.useGlobalPipes(new ValidationPipe());

  // Configuração de Cors para permitir requisições de outros domínios
  app.enableCors();

  // Configurar Swagger (caso queira gerar documentação da API automaticamente)
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('api', app, document);

  await app.listen(3000);  // O servidor vai rodar na porta 3000
}
bootstrap();
