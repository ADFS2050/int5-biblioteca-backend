import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { CriarEstoqueDto } from './dto/criar-estoque.dto';
import { AtualizarEstoqueDto } from './dto/atualizar-estoque.dto';

@Controller('estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Get()
  listarTodos() {
    return this.estoqueService.listarTodos();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.estoqueService.buscarPorId(id);
  }

  @Post()
  criar(@Body() criarEstoqueDto: CriarEstoqueDto) {
    return this.estoqueService.criar(criarEstoqueDto);
  }

  @Put(':id')
  atualizar(@Param('id') id: string, @Body() atualizarEstoqueDto: AtualizarEstoqueDto) {
    return this.estoqueService.atualizar(id, atualizarEstoqueDto);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.estoqueService.remover(id);
  }
}
