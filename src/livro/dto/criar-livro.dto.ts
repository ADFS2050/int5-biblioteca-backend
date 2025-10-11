export class CriarLivroDto {
  titulo: string;
  ano: number;
  edicao: number;
  editora: string;
  isbn: string;

  // Adicione estas propriedades para receber os IDs
  autoresIds: number[];
  generosIds: number[];
}