export class AtualizarLivroDto {
  titulo?: string;
  ano?: number;
  edicao?: number;
  editora?: string;
  isbn?: string;

  // Adicione estas duas linhas também
  idAutor?: number[];
  idGenero?: number[];
}