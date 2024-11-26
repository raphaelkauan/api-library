import { IsNotEmpty, IsString } from 'class-validator';

export class DevolucaoLivroDto {
  idEmprestimo?: string;

  @IsString()
  @IsNotEmpty()
  estadoLivro: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  livroId: string;
}
