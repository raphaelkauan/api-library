import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { GeneroLivro } from 'src/shared/enums/genero.enum';
import { ILivro } from 'src/shared/interfaces/livro.interface';

export class CreateLivroDto implements ILivro {
  id?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(55)
  titulo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(55)
  autor: string;

  @IsNumber()
  @IsNotEmpty()
  anoPublicacao: number;

  @IsNotEmpty()
  genero: GeneroLivro;

  createdAt?: Date;

  updatedAt?: Date;

  @IsNotEmpty()
  quantidade: number;
}
