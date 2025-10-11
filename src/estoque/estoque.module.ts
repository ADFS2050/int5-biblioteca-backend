import { Module } from '@nestjs/common';
import { EstoqueController } from './estoque.controller';
import { EstoqueService } from './estoque.service';
import { PrismaModule } from 'src/prisma/prisma.module'; // 1. IMPORTE O PRISMA MODULE

@Module({
  imports: [PrismaModule], // 2. ADICIONE O PRISMA MODULE AQUI
  controllers: [EstoqueController],
  providers: [EstoqueService],
})
export class EstoqueModule {}