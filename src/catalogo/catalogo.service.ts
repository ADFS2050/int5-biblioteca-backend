import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CriarCatalogoDto } from './dto/criar-catalogo.dto';
import { AtualizarCatalogoDto } from './dto/atualizar-catalogo.dto'; // Import que estava faltando

@Injectable()
export class CatalogoService {
  constructor(private prisma: PrismaService) {}

  create(criarCatalogoDto: CriarCatalogoDto) {
    // Usa o Prisma para criar um registro na tabela 'livro'
  
  }

  findAll() {
    return this.prisma.livro.findMany();
  }

  async findOne(id: number) {
    const livro = await this.prisma.livro.findUnique({
      where: { id },
    });

    if (!livro) {
      // Se o livro não for encontrado, lança uma exceção 404
      throw new NotFoundException(`Livro com o ID #${id} não encontrado.`);
    }

    return livro;
  }

  async update(id: number, atualizarCatalogoDto: AtualizarCatalogoDto) {
    // Primeiro, verifica se o livro existe usando o nosso próprio findOne
    await this.findOne(id);

  }

  async remove(id: number) {
    // Primeiro, verifica se o livro existe
    await this.findOne(id);

    // Se existir, deleta
    return this.prisma.livro.delete({ where: { id } });
  }
}