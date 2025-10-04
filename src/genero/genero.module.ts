import { Module } from '@nestjs/common';
import { GeneroService } from './genero.service';
import { GeneroController } from './genero.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  imports: [PrismaModule], // <-- Adicione aqui
  controllers: [GeneroController],
  providers: [GeneroService],
})
export class GenerosModule {} // Note: O nome da sua classe é GenerosModule