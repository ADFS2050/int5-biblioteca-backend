import { Injectable } from '@nestjs/common';
import { CriarEstoqueDto } from './dto/criar-estoque.dto';
import { AtualizarEstoqueDto } from './dto/atualizar-estoque.dto';

@Injectable()
export class EstoqueService {
  private itens = [];

  listarTodos(listarTodos) {
    return this.itens;
  }

  buscarPorId(id: string) {
    return this.itens.find(item => item.id === id);
  }

  criar(dados: CriarEstoqueDto) {
    const novo = { id: Date.now().toString(), ...dados };
    this.itens.push(novo);
    return novo;
  }

  atualizar(id: string, dados: AtualizarEstoqueDto) {
    const index = this.itens.findIndex(item => item.id === id);
    if (index === -1) return null;
    this.itens[index] = { ...this.itens[index], ...dados };
    return this.itens[index];
  }

  remover(id: string) {
    const index = this.itens.findIndex(item => item.id === id);
    if (index === -1) return null;
    return this.itens.splice(index, 1);
  }
}
