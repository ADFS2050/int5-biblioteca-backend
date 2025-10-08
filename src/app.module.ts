import { Module } from '@nestjs/common';
import { GenerosModule } from './genero/genero.module';
import { CatalogoModule } from './catalogo/catalogo.module';
import { AutoresModule } from './autores/autores.module';
import { PrismaModule } from './prisma/prisma.module';
import { EstoqueModule } from './estoque/estoque.module'; 

@Module({
  imports: [
    PrismaModule,
    CatalogoModule,
    GenerosModule,
    AutoresModule,
    EstoqueModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
