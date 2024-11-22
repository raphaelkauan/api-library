import { PrismaService } from 'src/database/prisma.service';
import { CreateLivroDto } from './dto/CreateLivro.dto';
import { Injectable } from '@nestjs/common';
import { ILivro } from 'src/shared/interfaces/livro.interface';

@Injectable()
export class LivroRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createLivro(createLivroDto: CreateLivroDto) {
    try {
      return await this.prisma.livros.create({
        data: {
          titulo: createLivroDto.titulo,
          autor: createLivroDto.autor,
          anoPublicacao: createLivroDto.anoPublicacao,
          genero: createLivroDto.genero,
        },
      });
    } catch (error) {
      throw new Error(`Erro ao criar um livro: ${error}`);
    }
  }

  async findAllLivros() {
    try {
      return this.prisma.livros.findMany();
    } catch (error) {
      throw new Error(`Erro ao buscar livros: ${error}`);
    }
  }

  async findLivroById(id: string) {
    try {
      const emprestadoValidation = this.validationEmprestimo(id);

      const livro = await this.prisma.livros.findFirst({
        where: { id },
        select: {
          titulo: true,
          autor: true,
          anoPublicacao: true,
          genero: true,
          Emprestimos: {
            include: {
              user: true,
            },
          },
        },
      });

      return {
        livro,
        Emprestado: (await emprestadoValidation).message,
      };
    } catch (error) {
      throw new Error(`Erro ao buscar o livro: ${error}`);
    }
  }

  async findLivroByTitulo(titulo: string) {
    try {
      return await this.prisma.livros.findFirst({
        where: { titulo },
      });
    } catch (error) {
      throw new Error(`Erro ao buscar livro por título : ${error}`);
    }
  }

  async validationEmprestimo(livroId: string) {
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
