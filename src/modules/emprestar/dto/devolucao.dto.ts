import { IsNotEmpty, IsString } from 'class-validator';

export class DevolucaoLivroDto {
  dataEmprestimo?: Date;

  idEmprestimo?: string;

  @IsNotEmpty()
  dataDevolucao: Date;

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
