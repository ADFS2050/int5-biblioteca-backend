// src/estoque/estoque.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CriarEstoqueDto } from './dto/criar-estoque.dto';
import { AtualizarEstoqueDto } from './dto/atualizar-estoque.dto';

@Injectable()
export class EstoqueService {
  // Injeta o PrismaService para poder interagir com o banco de dados
  constructor(private prisma: PrismaService) {}

  /**
   * Cria um novo registro de estoque no banco de dados.
   * Garante que o livro associado exista antes de criar.
   */
  async create(criarEstoqueDto: CriarEstoqueDto) {
    // Verifica se o livro com o ID fornecido realmente existe
    const livro = await this.prisma.livro.findUnique({
      where: { idLivro: criarEstoqueDto.idlivro },
    });

    // Se o livro não existir, lança um erro claro
    if (!livro) {
      throw new NotFoundException(
        `Livro com o ID #${criarEstoqueDto.idlivro} não encontrado.`,
      );
    }

    // Se o livro existir, cria o registro de estoque no banco
    return await this.prisma.estoque.create({
      data: criarEstoqueDto,
    });
  }

  /**
   * Retorna uma lista de todos os registros de estoque do banco.
   */
  async findAll() {
    return await this.prisma.estoque.findMany({
      include: {
        livro: true, // Inclui os dados do livro associado em cada registro
      },
    });
  }

  /**
   * Busca um registro de estoque específico pelo seu ID.
   */
  async findOne(idEstoque: number) {
    const estoque = await this.prisma.estoque.findUnique({
      where: { idEstoque },
      include: { livro: true },
    });

    if (!estoque) {
      throw new NotFoundException(`Estoque com ID #${idEstoque} não encontrado.`);
    }
    return estoque;
  }

  /**
   * Atualiza um registro de estoque existente.
   */
  async update(idEstoque: number, atualizarEstoqueDto: AtualizarEstoqueDto) {
    // Primeiro, garante que o registro de estoque que queremos atualizar existe
    await this.findOne(idEstoque);

    // Se existir, atualiza com os novos dados
    return await this.prisma.estoque.update({
      where: { idEstoque },
      data: atualizarEstoqueDto,
    });
  }

  /**
   * Remove um registro de estoque do banco de dados.
   */
  async remove(idEstoque: number) {
    // Garante que o registro de estoque existe antes de tentar deletar
    await this.findOne(idEstoque);

    // Se existir, remove do banco
    return await this.prisma.estoque.delete({
      where: { idEstoque },
    });
  }
}