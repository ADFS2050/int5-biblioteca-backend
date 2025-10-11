import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CriarLivroDto } from './dto/criar-livro.dto';
import { AtualizarLivroDto } from './dto/atualizar-livro.dto'; // Import que estava faltando

@Injectable()
export class LivroService {
  constructor(private prisma: PrismaService) {}

  create(criarLivroDto: CriarLivroDto) {
    // Usa o Prisma para criar um registro na tabela 'livro'
  
  }

  findAll() {
    return this.prisma.livro.findMany();
  }

  async findOne(idLivro: number) {
    const livro = await this.prisma.livro.findUnique({
      where: { idLivro },
    });

    if (!livro) {
      // Se o livro não for encontrado, lança uma exceção 404
      throw new NotFoundException(`Livro com o ID #${idLivro} não encontrado.`);
    }

    return livro;
  }

  async update(idLivro: number, atualizarLivroDto: AtualizarLivroDto) {
    // Primeiro, verifica se o livro existe usando o nosso próprio findOne
    await this.findOne(idLivro);

  }

  async remove(idLivro: number) {
    // Primeiro, verifica se o livro existe
    await this.findOne(idLivro);

    // Se existir, deleta
    return this.prisma.livro.delete({ where: { idLivro } });
  }
}