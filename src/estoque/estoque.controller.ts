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

  @Get(':idEstoque')
  async findOne(@Param('idEstoque', ParseIntPipe) idEstoque: number) {
    return await this.estoqueService.findOne(idEstoque);
  }

  @Post()
  async create(@Body() criarEstoqueDto: CriarEstoqueDto) {
    return await this.estoqueService.create(criarEstoqueDto);
  }

  @Put(':idEstoque')
  async update(
    @Param('idEstoque', ParseIntPipe) idEstoque: number,
    @Body() atualizarEstoqueDto: AtualizarEstoqueDto,
  ) {
    return await this.estoqueService.update(idEstoque, atualizarEstoqueDto);
  }

  @Delete(':idEstoque')
  async remove(@Param('idEstoque', ParseIntPipe) idEstoque: number) {
    return await this.estoqueService.remove(idEstoque);
  }
}
