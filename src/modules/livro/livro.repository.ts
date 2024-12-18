import { PrismaService } from '../../database/prisma.service';
import { CreateLivroDto } from './dto/CreateLivro.dto';
import { Injectable } from '@nestjs/common';
import { UpdateLivroDto } from './dto/UpdateLivro.dto';
import { EmprestarRepository } from '../emprestar/emprestar.repository';

@Injectable()
export class LivroRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emprestarRepository: EmprestarRepository,
  ) {}

  async createLivro(createLivroDto: CreateLivroDto) {
    try {
      return await this.prisma.livros.create({
        data: {
          titulo: createLivroDto.titulo,
          autor: createLivroDto.autor,
          anoPublicacao: createLivroDto.anoPublicacao,
          genero: createLivroDto.genero,
          quantidade: createLivroDto.quantidade,
        },
      });
    } catch (error) {
      throw new Error(`erro ao criar um livro: ${error}`);
    }
  }

  async findAllLivros() {
    try {
      return await this.prisma.livros.findMany();
    } catch (error) {
      throw new Error(`erro ao buscar livros: ${error}`);
    }
  }

  async findLivroById(id: string) {
    try {
      const emprestadoValidation =
        await this.emprestarRepository.validationLivroEmprestimo(id);

      const livro = await this.prisma.livros.findFirst({
        where: { id },
        select: {
          titulo: true,
          autor: true,
          anoPublicacao: true,
          genero: true,
          createdAt: true,
          updatedAt: true,
          quantidade: true,
          Emprestimos: {
            select: {
              dataDevolucao: true,
              dataEmprestimo: true,
              estadoLivro: true,
              user: {
                select: {
                  nome: true,
                  email: true,
                  tipoUser: true,
                },
              },
            },
          },
        },
      });

      return {
        livro,
        status: emprestadoValidation.message,
      };
    } catch (error) {
      throw new Error(`erro ao buscar o livro: ${error}`);
    }
  }

  async findLivroByTitulo(titulo: string) {
    try {
      return await this.prisma.livros.findFirst({
        where: { titulo },
      });
    } catch (error) {
      throw new Error(`erro ao buscar livro por título: ${error}`);
    }
  }

  async updateLivroById(id: string, updateLivroDto: UpdateLivroDto) {
    try {
      await this.prisma.livros.update({
        where: { id },
        data: {
          titulo: updateLivroDto.titulo,
          autor: updateLivroDto.autor,
          anoPublicacao: updateLivroDto.anoPublicacao,
          genero: updateLivroDto.genero,
        },
      });

      return { message: 'livro atualizado com sucesso!' };
    } catch (error) {
      throw new Error(`erro ao atualizar livro: ${error}`);
    }
  }

  async deleteLivroById(id: string) {
    try {
      await this.prisma.livros.delete({
        where: { id },
      });

      return { message: 'livro deletado com sucesso!' };
    } catch (error) {
      throw new Error(`erro ao deletar livro: ${error}`);
    }
  }
}
