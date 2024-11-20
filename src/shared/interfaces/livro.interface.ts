import { GeneroLivro } from '../enums/genero.enum';

export interface ILivro {
  titulo: string;
  autor: string;
  anoPublicacao: number;
  genero: GeneroLivro;
}
