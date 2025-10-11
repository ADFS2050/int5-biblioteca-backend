import { Module } from '@nestjs/common';
import { AutorService } from './autor.service';
import { AutorController } from './autor.controller';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports: [PrismaModule], // <-- Adicione aqui
  controllers: [AutorController],
  providers: [AutorService],
})
export class AutorModule {}