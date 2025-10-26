import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CriarLivroDto } from './dto/criar-livro.dto';
import { AtualizarLivroDto } from './dto/atualizar-livro.dto';

@Injectable()
export class LivroService {
  remove(idLivro: number) {
    throw new Error('Method not implemented.');
  }
  update(idLivro: number, atualizarlivroDto: AtualizarLivroDto) {
    throw new Error('Method not implemented.');
  }
  create(criarLivroDto: CriarLivroDto) {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const livros = await this.prisma.livro.findMany({
      include: {
        livroautor: { include: { autor: true } },
        livrogenero: { include: { genero: true } },
      },
    });

    return livros.map((livro) => ({
      ...livro,
      autores: livro.livroautor.map((la) => la.autor),
      generos: livro.livrogenero.map((lg) => lg.genero),
    }));
  }

  async findOne(idLivro: number) {
    const livro = await this.prisma.livro.findUnique({
      where: { idLivro },
      include: {
        livroautor: { include: { autor: true } },
        livrogenero: { include: { genero: true } },
      },
    });

    if (!livro) {
      throw new NotFoundException(`Livro ID ${idLivro} não encontrado.`);
    }

    return {
      ...livro,
      autores: livro.livroautor.map((la) => la.autor),
      generos: livro.livrogenero.map((lg) => lg.genero),
    };
  }
}
