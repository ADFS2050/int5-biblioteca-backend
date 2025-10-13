import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita o Cross-Origin Resource Sharing (CORS)
  // Essencial para a comunicação entre frontend e backend
  app.enableCors();

  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('API de livros')
    .setDescription('Documentação da API de Empréstimos')
    .setVersion('1.0')
    .addTag('livro') // opcional, só pra agrupar endpoints
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // A porta deve ser a que você usa, geralmente 3001 ou 3000
  await app.listen(3001);
}
bootstrap();