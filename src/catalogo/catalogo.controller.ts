import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CatalogoService } from './catalogo.service';
import { CriarCatalogoDto } from './dto/criar-catalogo.dto';
import { AtualizarCatalogoDto } from './dto/atualizar-catalogo.dto';

@Controller('catalogo')
export class CatalogoController {
  constructor(private readonly catalogoService: CatalogoService) {}

  @Get()
  listarTodos() {
    return this.catalogoService.listarTodos();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.catalogoService.buscarPorId(id);
  }

  @Post()
  criar(@Body() criarCatalogoDto: CriarCatalogoDto) {
    return this.catalogoService.criar(criarCatalogoDto);
  }

  @Put(':id')
  atualizar(@Param('id') id: string, @Body() atualizarCatalogoDto: AtualizarCatalogoDto) {
    return this.catalogoService.atualizar(id, atualizarCatalogoDto);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.catalogoService.remover(id);
  }
}
