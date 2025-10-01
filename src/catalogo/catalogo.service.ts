import { Injectable } from '@nestjs/common';
import { CriarCatalogoDto } from './dto/criar-catalogo.dto';
import { AtualizarCatalogoDto } from './dto/atualizar-catalogo.dto';

@Injectable()
export class CatalogoService {
  private catalogos = [];

  listarTodos() {
    return this.catalogos;
  }

  buscarPorId(id: string) {
    return this.catalogos.find(item => item.id === id);
  }

  criar(dados: CriarCatalogoDto) {
    const novo = { id: Date.now().toString(), ...dados };
    this.catalogos.push(novo);
    return novo;
  }

  atualizar(id: string, dados: AtualizarCatalogoDto) {
    const index = this.catalogos.findIndex(item => item.id === id);
    if (index === -1) return null;
    this.catalogos[index] = { ...this.catalogos[index], ...dados };
    return this.catalogos[index];
  }

  remover(id: string) {
    const index = this.catalogos.findIndex(item => item.id === id);
    if (index === -1) return null;
    return this.catalogos.splice(index, 1);
  }
}
