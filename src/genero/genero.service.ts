import { Injectable } from '@nestjs/common';
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

  async buscarPorId(id: number) {
    return this.prisma.genero.findUnique({
      where: { id },
    });
  }

  async atualizar(id: number, atualizarGeneroDto: AtualizarGeneroDto) {
    return this.prisma.genero.update({
      where: { id },
      data: atualizarGeneroDto,
    });
  }

  async remover(id: number) {
    return this.prisma.genero.delete({
      where: { id },
    });
  }
}