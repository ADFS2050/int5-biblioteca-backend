import { Module } from '@nestjs/common';
import { AutoresService } from './autores.service';
import { AutoresController } from './autores.controller';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports: [PrismaModule], // <-- Adicione aqui
  controllers: [AutoresController],
  providers: [AutoresService],
})
export class AutoresModule {}