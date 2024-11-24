import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { EmprestarLivroDto } from './dto/emprestar.dto';
import { TipoOperacao } from '@prisma/client';

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

      const quantidadeLivro = this.findQuantidadeLivro(
        emprestarLivroDto.livroId,
      );

      await this.prisma.livros.update({
        where: {
          id: emprestarLivroDto.livroId,
        },
        data: {
          quantidade: (await quantidadeLivro).quantidade - 1,
        },
      });

      await this.registerHistorico(
        {
          idEmprestimo: detailsEmprestar.id,
          dataEmprestimo: detailsEmprestar.dataEmprestimo,
          dataDevolucao: detailsEmprestar.dataDevolucao,
          estadoLivro: detailsEmprestar.estadoLivro,
          userId: detailsEmprestar.userId,
          livroId: detailsEmprestar.livroId,
        },
        'emprestimo',
      );
    } catch (error) {
      throw new Error(`Erro ao emprestar o livro: ${error}`);
    }
  }

  async registerHistorico(
    emprestarLivroDto: EmprestarLivroDto,
    tipoOperacao: TipoOperacao,
  ) {
    try {
      await this.prisma.historico.create({
        data: {
          idEmprestimo: emprestarLivroDto.idEmprestimo,
          dataEmprestimo: emprestarLivroDto.dataEmprestimo,
          dataDevolucao: emprestarLivroDto.dataDevolucao,
          estadoLivro: emprestarLivroDto.estadoLivro,
          userId: emprestarLivroDto.userId,
          livroId: emprestarLivroDto.livroId,
          tipoOperacao: tipoOperacao,
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

      const quantidadeLivro = this.findQuantidadeLivro(livroId);

      await this.prisma.livros.update({
        where: {
          id: livroId,
        },
        data: {
          quantidade: (await quantidadeLivro).quantidade + 1,
        },
      });

      this.registerHistorico(
        {
          idEmprestimo: (await emprestarId).id,
          dataEmprestimo: (await emprestarId).dataDevolucao,
          dataDevolucao: (await emprestarId).dataDevolucao,
          estadoLivro: (await emprestarId).estadoLivro,
          userId: (await emprestarId).userId,
          livroId: (await emprestarId).livroId,
        },
        'devolucao',
      );
    } catch (error) {
      throw new Error(`Erro ao devolver o livro: ${error}`);
    }
  }

  async validationLivroEmprestimo(
    livroId: string,
  ): Promise<{ message: string }> {
    try {
      const validationQuantidadeLivro = this.findQuantidadeLivro(livroId);

      if ((await validationQuantidadeLivro).quantidade == 0) {
        return { message: 'livro não dispoviel!' };
      } else {
        return { message: 'livro dispoviel!' };
      }
    } catch (error) {
      throw new Error(`Erro ao validar emprestimo: ${error}`);
    }
  }

  async findQuantidadeLivro(livroId: string) {
    return await this.prisma.livros.findFirst({
      where: { id: livroId },
      select: {
        quantidade: true,
      },
    });
  }

  async findEmprestimoByUserAndLivro(userId: string, livroId: string) {
    const emprestadoValidation = await this.prisma.emprestimos.findFirst({
      where: {
        userId,
        AND: { livroId },
      },
    });

    return emprestadoValidation ? true : false;
  }
}
