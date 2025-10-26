import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CriarLivroDto } from './dto/criar-livro.dto';
import { AtualizarLivroDto } from './dto/atualizar-livro.dto';

@Injectable()
export class LivroService {
  constructor(private prisma: PrismaService) {}

  async create(criarLivroDto: CriarLivroDto) {
    const {
      titulo,
      ano,
      edicao,
      editora,
      isbn,
      quantidade,
      autorNome,
      idGenero
    } = criarLivroDto;

    // ✅ Buscar autor
    let autor = await this.prisma.autor.findFirst({
      where: { nome: autorNome }
    });

    // ✅ Criar se não existir
   if (!autor) {
  autor = await this.prisma.autor.create({
    data: {
      nome: autorNome,
      nacionalidade: 'Não Informada',
      matricula: String(Date.now()).slice(-6) // ✅ para caber no VARCHAR(11)
    }
  });
}

    // ✅ Criar livro
    const livroCriado = await this.prisma.livro.create({
      data: {
        titulo,
        ano,
        edicao,
        editora,
        isbn
      }
    });

    const idLivro = livroCriado.idLivro;

    // ✅ Relacionar Autor ao Livro
    await this.prisma.livroautor.create({
      data: {
        idLivro,
        idAutor: autor.idAutor
      }
    });

    // ✅ Relacionar Gêneros ao Livro
    for (const id of idGenero ?? []) {
      await this.prisma.livrogenero.create({
        data: {
          idLivro,
          idGenero: id
        }
      });
    }

    // ✅ Criar Estoque com Quantidade Inicial
    await this.prisma.estoque.create({
      data: {
        idlivro: idLivro,
        quantidade: quantidade ?? 0
      }
    });

    return { message: '📚 Livro cadastrado com sucesso!' };
  }

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

  update(idLivro: number, atualizarlivroDto: AtualizarLivroDto) {
    throw new Error('Method not implemented.');
  }

  remove(idLivro: number) {
    throw new Error('Method not implemented.');
  }
}
