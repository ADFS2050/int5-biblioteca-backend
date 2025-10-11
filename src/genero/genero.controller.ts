// src/genero/genero.controller.ts

import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { GeneroService } from './genero.service';
import { CriarGeneroDto } from './dto/criar-genero.dto';
import { AtualizarGeneroDto } from './dto/atualizar-genero.dto';

@Controller('genero')
export class GeneroController {
  constructor(private readonly generoService: GeneroService) {}

  @Post()
  async criar(@Body() criarGeneroDto: CriarGeneroDto) {
    return await this.generoService.criar(criarGeneroDto);
  }

  @Get()
  async listarTodos() {
    return await this.generoService.listarTodos();
  }

  @Get(':idGenero')
  async buscarPorId(@Param('idGenero', ParseIntPipe) idGenero: number) {
    return await this.generoService.buscarPorId(idGenero);
  }

  @Put(':idGenero')
  async atualizar(@Param('idGenero', ParseIntPipe) idGenero: number, @Body() atualizarGeneroDto: AtualizarGeneroDto) {
    return await this.generoService.atualizar(idGenero, atualizarGeneroDto);
  }

  @Delete(':idGenero')
  async remover(@Param('idGenero', ParseIntPipe) idGenero: number) {
    return await this.generoService.remover(idGenero);
  }
}