// src/genero/genero.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CriarGeneroDto } from './dto/criar-genero.dto';
import { AtualizarGeneroDto } from './dto/atualizar-genero.dto';

@Injectable()
export class GeneroService {
  constructor(private prisma: PrismaService) {}

  async criar(criarGeneroDto: CriarGeneroDto) {
    return this.prisma.genero.create({
      data: criarGeneroDto,
    });
  }

  async listarTodos() {
    return this.prisma.genero.findMany();
  }

  async buscarPorId(idGenero: number) {
    const genero = await this.prisma.genero.findUnique({
      where: { idGenero },
    });

    // Se o gênero não for encontrado, lança um erro 404 claro.
    if (!genero) {
      throw new NotFoundException(`Gênero com ID #${idGenero} não encontrado.`);
    }
    return genero;
  }

  async atualizar(idGenero: number, atualizarGeneroDto: AtualizarGeneroDto) {
    // Primeiro, garante que o gênero existe antes de tentar atualizar.
    await this.buscarPorId(idGenero);

    return this.prisma.genero.update({
      where: { idGenero },
      data: atualizarGeneroDto,
    });
  }

  async remover(idGenero: number) {
    // Garante que o gênero existe antes de tentar remover.
    await this.buscarPorId(idGenero);

    return this.prisma.genero.delete({
      where: { idGenero },
    });
  }
}