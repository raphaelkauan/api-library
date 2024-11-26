import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { EmprestarLivroDto } from './dto/emprestar.dto';
import { TipoOperacao } from '@prisma/client';
import { DevolucaoLivroDto } from './dto/devolucao.dto';

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
      throw new Error(`erro ao emprestar o livro: ${error}`);
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
      throw new Error(`erro ao registar o histórico: ${error}`);
    }
  }

  async devolucaoLivro(devolucaoLivro: DevolucaoLivroDto) {
    try {
      const emprestarId = this.prisma.emprestimos.findFirst({
        where: { livroId: devolucaoLivro.livroId },
      });

      await this.prisma.emprestimos.delete({
        where: { id: (await emprestarId).id },
      });

      const quantidadeLivro = this.findQuantidadeLivro(devolucaoLivro.livroId);

      await this.prisma.livros.update({
        where: {
          id: devolucaoLivro.livroId,
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
      throw new Error(`erro ao devolver o livro: ${error}`);
    }
  }

  async validationLivroEmprestimo(livroId: string) {
    try {
      const validationQuantidadeLivro = this.findQuantidadeLivro(livroId);

      if ((await validationQuantidadeLivro).quantidade == 0) {
        return { message: 'livro não dispoviel!' };
      } else {
        return { message: 'livro dispoviel!' };
      }
    } catch (error) {
      throw new Error(`erro ao validar emprestimo: ${error}`);
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

  async validationDataDevolucao(livroId: string) {
    const livro = await this.prisma.emprestimos.findFirst({
      where: { livroId },
    });

    if (!livro) {
      throw new HttpException('livro inválido', HttpStatus.BAD_GATEWAY);
    }

    const dataDevolucaoLivro = new Date(livro.dataDevolucao);

    const dateNow = new Date();

    if (dateNow > dataDevolucaoLivro) {
      const atrasoDias = Math.ceil(
        (Number(dataDevolucaoLivro) - Number(dateNow)) / (1000 * 60 * 60 * 24),
      );
      return {
        message: {
          atrasado: true,
          diasAtrasado: atrasoDias,
        },
      };
    } else {
      return {
        message: {
          atrasado: false,
          diasAtrasado: 0,
        },
      };
    }
  }
}
