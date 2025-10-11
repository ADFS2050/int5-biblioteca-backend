import {Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { LivroService } from './livro.service';
import { CriarLivroDto } from './dto/criar-livro.dto';
import { AtualizarLivroDto } from './dto/atualizar-livro.dto';

@Controller('livro') // Define a rota base para este controller, ex: http://localhost:3000/catalogo
export class LivroController {
  constructor(private readonly livroService: LivroService) {}

  /**
   * Rota para criar um novo livro no catálogo.
   * HTTP POST /catalogo
   */
  @Post()
  async create(@Body() criarLivroDto: CriarLivroDto) { // << PRECISA ser async
    return await this.livroService.create(criarLivroDto); // << PRECISA ter return e await
  }

  /**
   * Rota para listar todos os livros do catálogo.
   * HTTP GET /catalogo
   */
  @Get()
  findAll() {
    return this.livroService.findAll();
  }

  /**
   * Rota para buscar um livro específico pelo seu ID.
   * HTTP GET /catalogo/:id
   */
  @Get(':idLivro')
  findOne(@Param('idLivro', ParseIntPipe) idLivro: number) {
    // ParseIntPipe valida se o 'id' é um número e o converte.
    return this.livroService.findOne(idLivro);
  }

  /**
   * Rota para atualizar os dados de um livro pelo ID.
   * HTTP PATCH /catalogo/:id
   */
  @Put(':idLivro')
  update(
    @Param('idLivro', ParseIntPipe) idLivro: number,
    @Body() atualizarlivroDto: AtualizarLivroDto,
  ) {
    return this.livroService.update(idLivro, atualizarlivroDto);
  }

  /**
   * Rota para remover um livro do catálogo pelo ID.
   * HTTP DELETE /catalogo/:id
   */
  @Delete(':idLivro')
  remove(@Param('idLivro', ParseIntPipe) idLivro: number) {
    return this.livroService.remove(idLivro);
  }
}