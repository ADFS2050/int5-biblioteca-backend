import { Module } from '@nestjs/common';
import { CatalogoModule } from './catalogo/catalogo.module';
import { EstoqueModule } from './estoque/estoque.module';

@Module({
  imports: [CatalogoModule, EstoqueModule],
})
export class AppModule {}
