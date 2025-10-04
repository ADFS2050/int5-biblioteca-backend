import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita o Cross-Origin Resource Sharing (CORS)
  // Essencial para a comunicação entre frontend e backend
  app.enableCors();

  // A porta deve ser a que você usa, geralmente 3001 ou 3000
  await app.listen(3001);
}
bootstrap();