// ✅ ADICIONE ESTA LINHA
import { PrismaModule } from '../prisma/prisma.module';

import { Module } from '@nestjs/common';
import { LivroService } from './livro.service';
import { LivroController } from './livro.controller';

@Module({
  imports: [PrismaModule], // Agora o TypeScript sabe o que é PrismaModule
  controllers: [LivroController],
  providers: [LivroService],
})
export class LivroModule {}