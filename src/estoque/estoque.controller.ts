// src/estoque/estoque.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { CriarEstoqueDto } from './dto/criar-estoque.dto';
import { AtualizarEstoqueDto } from './dto/atualizar-estoque.dto';

@Controller('estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Get()
  async findAll() {
    return await this.estoqueService.findAll();
  }

  @Get(':idLivro')
  // ----- CORREÇÃO APLICADA AQUI -----
  async findOne(@Param('idLivro', ParseIntPipe) idEstoque: number) {
    // Agora a variável se chama 'idEstoque'
    return await this.estoqueService.findOne(idEstoque);
  }

  @Post()
  async create(@Body() criarEstoqueDto: CriarEstoqueDto) {
    return await this.estoqueService.create(criarEstoqueDto);
  }

  @Put(':idLivro')
  // ----- CORREÇÃO APLICADA AQUI -----
  async update(
    @Param('idLivro', ParseIntPipe) idEstoque: number, // Variável renomeada
    @Body() atualizarEstoqueDto: AtualizarEstoqueDto,
  ) {
    return await this.estoqueService.update(idEstoque, atualizarEstoqueDto);
  }

  @Delete(':idLivro')
  // ----- CORREÇÃO APLICADA AQUI -----
  async remove(@Param('idLivro', ParseIntPipe) idEstoque: number) { // Variável renomeada
    return await this.estoqueService.remove(idEstoque);
  }
}