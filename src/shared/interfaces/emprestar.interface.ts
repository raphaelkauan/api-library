export interface IEmprestar {
  id?: String;
  idEmprestimo: string;
  dataEmprestimo?: Date;
  dataDevolucao: Date;
  estadoLivro: string;
  userId: string;
  livroId: string;
}
