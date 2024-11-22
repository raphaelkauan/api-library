import { GeneroLivro } from '@prisma/client';

export interface ILivro {
  id?: string;
  titulo: string;
  autor: string;
  anoPublicacao: number;
  genero: GeneroLivro;
  createdAt?: Date;
  updatedAt?: Date;
}
