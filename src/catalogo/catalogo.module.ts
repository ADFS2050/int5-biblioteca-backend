// ✅ ADICIONE ESTA LINHA
import { PrismaModule } from '../prisma/prisma.module';

import { Module } from '@nestjs/common';
import { CatalogoService } from './catalogo.service';
import { CatalogoController } from './catalogo.controller';

@Module({
  imports: [PrismaModule], // Agora o TypeScript sabe o que é PrismaModule
  controllers: [CatalogoController],
  providers: [CatalogoService],
})
export class CatalogoModule {}