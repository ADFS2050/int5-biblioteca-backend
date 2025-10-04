import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CriarAutorDto } from './dto/criar-autores.dto';
import { AtualizarAutorDto } from './dto/atualizar-autores.dto';

@Injectable()
export class AutoresService {
  constructor(private prisma: PrismaService) {}

  async criar(criarAutorDto: CriarAutorDto) {
    return this.prisma.autor.create({
      data: criarAutorDto,
    });
  }

  async listarTodos() {
    return this.prisma.autor.findMany();
  }

  async buscarPorId(id: number) {
    return this.prisma.autor.findUnique({
      where: { id },
    });
  }

  async atualizar(id: number, atualizarAutorDto: AtualizarAutorDto) {
    return this.prisma.autor.update({
      where: { id },
      data: atualizarAutorDto,
    });
  }

  async remover(id: number) {
    return this.prisma.autor.delete({
      where: { id },
    });
  }
}