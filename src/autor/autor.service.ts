import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CriarAutorDto } from '../autor/dto/criar-autor.dto';
import { AtualizarAutorDto } from './dto/atualizar-autor.dto';

@Injectable()
export class AutorService {
  constructor(private prisma: PrismaService) {}

  async criar(criarAutorDto: CriarAutorDto) {
    return this.prisma.autor.create({
      data: criarAutorDto,
    });
  }

  async listarTodos() {
    return this.prisma.autor.findMany();
  }

  async buscarPorId(idAutor: number) {
    return this.prisma.autor.findUnique({
      where: { idAutor },
    });
  }

  async atualizar(idAutor: number, atualizarAutorDto: AtualizarAutorDto) {
    return this.prisma.autor.update({
      where: { idAutor },
      data: atualizarAutorDto,
    });
  }

  async remover(idAutor: number) {
    return this.prisma.autor.delete({
      where: { idAutor },
    });
  }
}