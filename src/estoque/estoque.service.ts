import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CriarEstoqueDto } from './dto/criar-estoque.dto';
import { AtualizarEstoqueDto } from './dto/atualizar-estoque.dto';

@Injectable()
export class EstoqueService {
  constructor(private prisma: PrismaService) {}

  // Lista todos os registros de estoque + livro + autores + gêneros
  async findAll() {
    return this.prisma.estoque.findMany({
      include: {
        livro: {
          include: {
            livroautor: { include: { autor: true } },
            livrogenero: { include: { genero: true } },
          },
        },
      },
    });
  }

  // Busca um estoque por idEstoque
  async findOne(idEstoque: number) {
    const estoque = await this.prisma.estoque.findUnique({
      where: { idEstoque },
      include: {
        livro: {
          include: {
            livroautor: { include: { autor: true } },
            livrogenero: { include: { genero: true } },
          },
        },
      },
    });

    if (!estoque) {
      throw new NotFoundException(`Estoque #${idEstoque} não encontrado`);
    }

    return estoque;
  }

  // Cria um registro de estoque (valida se o livro existe)
  async create(dto: CriarEstoqueDto) {
    const livro = await this.prisma.livro.findUnique({
      where: { idLivro: dto.idlivro },
      select: { idLivro: true },
    });

    if (!livro) {
      throw new NotFoundException(`Livro #${dto.idlivro} não encontrado`);
    }

    return this.prisma.estoque.create({
      data: {
        quantidade: dto.quantidade,
        idlivro: dto.idlivro,
      },
    });
  }

  // Atualiza um estoque (ex.: quantidade)
  async update(idEstoque: number, dto: AtualizarEstoqueDto) {
    // garante que existe
    await this.findOne(idEstoque);

    return this.prisma.estoque.update({
      where: { idEstoque },
      data: {
        // hoje só usamos quantidade; se quiser, adicione outros campos aqui
        ...(dto.quantidade !== undefined ? { quantidade: dto.quantidade } : {}),
      },
    });
  }

  // Remove um estoque
  async remove(idEstoque: number) {
    // garante que existe
    await this.findOne(idEstoque);

    return this.prisma.estoque.delete({
      where: { idEstoque },
    });
  }
}
