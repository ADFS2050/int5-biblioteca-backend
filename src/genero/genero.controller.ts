import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { GeneroService } from './genero.service';
import { CriarGeneroDto } from './dto/criar-genero.dto';
import { AtualizarGeneroDto } from './dto/atualizar-genero.dto';


@Controller('generos')
export class GeneroController {
  constructor(private readonly generoService: GeneroService) {}

  @Post()
  criar(@Body() criarGeneroDto: CriarGeneroDto) {
    return this.generoService.criar(criarGeneroDto);
  }

  @Get()
  listarTodos() {
    return this.generoService.listarTodos();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.generoService.buscarPorId(+id); // Converte para número
  }

  @Put(':id')
  atualizar(@Param('id') id: string, @Body() atualizarGeneroDto: AtualizarGeneroDto) {
    return this.generoService.atualizar(+id, atualizarGeneroDto); // Converte para número
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.generoService.remover(+id); // Converte para número
  }
}