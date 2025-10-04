import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AutoresService } from './autores.service';
import { CriarAutorDto } from './dto/criar-autores.dto';
import { AtualizarAutorDto } from './dto/atualizar-autores.dto';

@Controller('autores')
export class AutoresController {
  constructor(private readonly autoresService: AutoresService) {}

  @Post()
  criar(@Body() criarAutorDto: CriarAutorDto) {
    return this.autoresService.criar(criarAutorDto);
  }

  @Get()
  listarTodos() {
    return this.autoresService.listarTodos();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.autoresService.buscarPorId(+id); // Converte para número
  }

  @Put(':id')
  atualizar(@Param('id') id: string, @Body() atualizarAutorDto: AtualizarAutorDto) {
    return this.autoresService.atualizar(+id, atualizarAutorDto); // Converte para número
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.autoresService.remover(+id); // Converte para número
  }
}