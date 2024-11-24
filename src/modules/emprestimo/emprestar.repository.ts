import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { EmprestarLivroDto } from './dto/emprestar.dto';

@Injectable()
export class EmprestarRepository {
  constructor(private readonly prisma: PrismaService) {}

  async emprestarLivro(emprestarLivroDto: EmprestarLivroDto) {
    try {
      const detailsEmprestar = await this.prisma.emprestimos.create({
        data: {
          dataEmprestimo: emprestarLivroDto.dataEmprestimo,
          dataDevolucao: emprestarLivroDto.dataDevolucao,
          estadoLivro: emprestarLivroDto.estadoLivro,
          userId: emprestarLivroDto.userId,
          livroId: emprestarLivroDto.livroId,
        },
      });

      await this.registerHistorico({
        idEmprestimo: detailsEmprestar.id,
        dataEmprestimo: detailsEmprestar.dataEmprestimo,
        dataDevolucao: detailsEmprestar.dataDevolucao,
        estadoLivro: detailsEmprestar.estadoLivro,
        userId: detailsEmprestar.userId,
        livroId: detailsEmprestar.livroId,
      });
    } catch (error) {
      throw new Error(`Erro ao emprestar o livro: ${error}`);
    }
  }

  async registerHistorico(emprestarLivroDto: EmprestarLivroDto) {
    try {
      await this.prisma.historico.create({
        data: {
          idEmprestimo: emprestarLivroDto.idEmprestimo,
          dataEmprestimo: emprestarLivroDto.dataEmprestimo,
          dataDevolucao: emprestarLivroDto.dataDevolucao,
          estadoLivro: emprestarLivroDto.estadoLivro,
          userId: emprestarLivroDto.userId,
          livroId: emprestarLivroDto.livroId,
        },
      });
    } catch (error) {
      throw new Error(`Erro ao registar o histórico: ${error}`);
    }
  }

  async devolucaoLivro(livroId: string) {
    try {
      const emprestarId = this.prisma.emprestimos.findFirst({
        where: { livroId },
      });

      await this.prisma.emprestimos.delete({
        where: { id: (await emprestarId).id },
      });
    } catch (error) {
      throw new Error(`Erro ao devolver o livro: ${error}`);
    }
  }

  async validationLivroEmprestimo(
    livroId: string,
  ): Promise<{ message: string }> {
    try {
      const emprestimo = await this.prisma.emprestimos.findFirst({
        where: { livroId },
      });

      if (emprestimo) {
        return { message: 'livro emprestado!' };
      } else {
        return { message: 'livro não emprestado!' };
      }
    } catch (error) {
      throw new Error(`Erro ao validar emprestimo: ${error}`);
    }
  }
}
