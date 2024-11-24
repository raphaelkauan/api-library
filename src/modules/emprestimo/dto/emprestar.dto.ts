import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { IEmprestar } from 'src/shared/interfaces/emprestar.interface';

export class EmprestarLivroDto implements IEmprestar {
  id?: String;

  dataEmprestimo?: Date;

  idEmprestimo: string;

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
