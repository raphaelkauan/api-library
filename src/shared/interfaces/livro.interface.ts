import { GeneroLivro } from '../enums/genero.enum';

export interface ILivro {
  id?: string;
  titulo: string;
  autor: string;
  anoPublicacao: number;
  genero: GeneroLivro;
  createdAt?: Date;
  updatedAt?: Date;
}
