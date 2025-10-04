import { Module } from '@nestjs/common';

// Use caminhos absolutos com '@/' para evitar erros

import { GenerosModule } from './genero/genero.module';
import { CatalogoModule } from './catalogo/catalogo.module';
import { AutoresModule } from './autores/autores.module';
import { PrismaModule } from './prisma/prisma.module';
// Se tiver mais módulos, importe-os da mesma forma

@Module({
  imports: [
    PrismaModule,
    CatalogoModule,
    GenerosModule,
    AutoresModule,
    // ...seus outros módulos
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}