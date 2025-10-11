import { Module } from '@nestjs/common';
import { GenerosModule } from './genero/genero.module';
import { LivroModule } from './livro/livro.module';
import { AutorModule } from './autor/autor.module';
import { PrismaModule } from './prisma/prisma.module';
import { EstoqueModule } from './estoque/estoque.module'; 


@Module({
  imports: [
    PrismaModule,
    GenerosModule,
    AutorModule,
    EstoqueModule,
    LivroModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
