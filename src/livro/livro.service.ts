// src/livro/livro.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CriarLivroDto } from './dto/criar-livro.dto';
import { AtualizarLivroDto } from './dto/atualizar-livro.dto';

@Injectable()
export class LivroService {
  constructor(private prisma: PrismaService) {}

  /**
   * Cria um novo livro e o conecta com autores e gêneros existentes.
   */
  async create(criarLivroDto: CriarLivroDto) {
    // 1. [CORRIGIDO] Separa os IDs usando os nomes padronizados
    const { idAutor, idGenero, ...dadosDoLivro } = criarLivroDto;

    // 2. Cria o livro e, na mesma operação, cria as conexões nas tabelas de junção
    return await this.prisma.livro.create({
      data: {
        ...dadosDoLivro, // Usa os dados normais do livro (título, ano, etc.)

        // Conecta o livro aos autores através da tabela 'livroautor'
        livroautor: {
          // [CORRIGIDO] Usa a variável 'autoresIds'
          create: idAutor.map((id) => ({
            autor: {
              connect: { idAutor: id },
            },
          })),
        },

        // Conecta o livro aos gêneros através da tabela 'livrogenero'
        livrogenero: {
          // [CORRIGIDO] Usa a variável 'generosIds'
          create: idGenero.map((id) => ({
            genero: {
              connect: { idGenero: id },
            },
          })),
        },
      },
    });
  }

  /**
   * Retorna uma lista de todos os livros.
   */
  async findAll() {
    return await this.prisma.livro.findMany({
      // Opcional: Inclui os autores e gêneros na listagem
      include: {
        livroautor: { include: { autor: true } },
        livrogenero: { include: { genero: true } },
      },
    });
  }

  /**
   * Busca um livro específico pelo seu ID.
   */
  async findOne(idLivro: number) {
    const livro = await this.prisma.livro.findUnique({
      where: { idLivro },
      include: {
        livroautor: { include: { autor: true } },
        livrogenero: { include: { genero: true } },
      },
    });

    if (!livro) {
      throw new NotFoundException(`Livro com o ID #${idLivro} não encontrado.`);
    }

    return livro;
  }

  /**
   * Atualiza um livro e suas conexões com autores e gêneros.
   */
  async update(idLivro: number, atualizarLivroDto: AtualizarLivroDto) {
    // 1. Garante que o livro que queremos atualizar existe.
    await this.findOne(idLivro);

    // 2. Separa os IDs das outras informações do livro (este já estava correto)
    const { idAutor, idGenero, ...dadosDoLivro } = atualizarLivroDto;

    return await this.prisma.livro.update({
      where: { idLivro },
      data: {
        ...dadosDoLivro, // Atualiza os dados normais do livro

        // A estratégia aqui é "substituir": apaga as conexões antigas e cria as novas.
        livroautor: {
          deleteMany: {}, // Apaga todas as conexões de autores existentes para este livro
          create: idGenero?.map((id) => ({ // O '?' é por segurança, caso a lista não seja enviada
            autor: { connect: { idAutor: id } },
          })),
        },

        livrogenero: {
          deleteMany: {}, // Apaga todas as conexões de gêneros existentes
          create: idGenero?.map((id) => ({
            genero: { connect: { idGenero: id } },
          })),
        },
      },
    });
  }

  /**
   * Remove um livro do banco de dados.
   */
  async remove(idLivro: number) {
    // Garante que o livro existe antes de tentar deletar.
    await this.findOne(idLivro);

    // O Prisma cuidará de remover as conexões em 'livroautor' e 'livrogenero'
    // se o schema estiver configurado com 'onDelete: Cascade'.
    // Com 'Restrict', ele dará um erro se o livro estiver em uso, o que é seguro.
    return await this.prisma.livro.delete({ where: { idLivro } });
  }
}