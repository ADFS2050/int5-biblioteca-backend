import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AutorService } from './autor.service';
import { CriarAutorDto } from '../autor/dto/criar-autor.dto';
import { AtualizarAutorDto } from './dto/atualizar-autor.dto';

@Controller('autor')
export class AutorController {
  constructor(private readonly autorService: AutorService) {}

  @Post()
  criar(@Body() criarAutorDto: CriarAutorDto) {
    return this.autorService.criar(criarAutorDto);
  }

  @Get()
  listarTodos() {
    return this.autorService.listarTodos();
  }

  @Get(':idAutor')
  buscarPorId(@Param('idAutor') idAutor: string) {
    return this.autorService.buscarPorId(+idAutor); // Converte para número
  }

  @Put(':idAutor')
  atualizar(@Param('idAutor') idAutor: string, @Body() atualizarAutorDto: AtualizarAutorDto) {
    return this.autorService.atualizar(+idAutor, atualizarAutorDto); // Converte para número
  }

  @Delete(':idAutor')
  remover(@Param('idAutor') idAutor: string) {
    return this.autorService.remover(+idAutor); // Converte para número
  }
}