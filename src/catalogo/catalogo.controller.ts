import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe, // Importe o ParseIntPipe para validar e converter o ID
} from '@nestjs/common';
import { CatalogoService } from './catalogo.service';
import { CriarCatalogoDto } from './dto/criar-catalogo.dto';
import { AtualizarCatalogoDto } from './dto/atualizar-catalogo.dto';

@Controller('catalogo') // Define a rota base para este controller, ex: http://localhost:3000/catalogo
export class CatalogoController {
  constructor(private readonly catalogoService: CatalogoService) {}

  /**
   * Rota para criar um novo livro no catálogo.
   * HTTP POST /catalogo
   */
  @Post()
  create(@Body() criarCatalogoDto: CriarCatalogoDto) {
    return this.catalogoService.create(criarCatalogoDto);
  }

  /**
   * Rota para listar todos os livros do catálogo.
   * HTTP GET /catalogo
   */
  @Get()
  findAll() {
    return this.catalogoService.findAll();
  }

  /**
   * Rota para buscar um livro específico pelo seu ID.
   * HTTP GET /catalogo/:id
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    // ParseIntPipe valida se o 'id' é um número e o converte.
    return this.catalogoService.findOne(id);
  }

  /**
   * Rota para atualizar os dados de um livro pelo ID.
   * HTTP PATCH /catalogo/:id
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() atualizarCatalogoDto: AtualizarCatalogoDto,
  ) {
    return this.catalogoService.update(id, atualizarCatalogoDto);
  }

  /**
   * Rota para remover um livro do catálogo pelo ID.
   * HTTP DELETE /catalogo/:id
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.catalogoService.remove(id);
  }
}