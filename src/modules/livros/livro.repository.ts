import { PrismaService } from '../../database/prisma.service';
import { CreateLivroDto } from './dto/CreateLivro.dto';
import { Injectable } from '@nestjs/common';
import { ILivro } from 'src/shared/interfaces/livro.interface';
import { UpdateLivroDto } from './dto/UpdateLivro.dto';
import { EmprestarRepository } from '../emprestimo/emprestar.repository';

@Injectable()
export class LivroRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emprestarRepository: EmprestarRepository,
  ) {}

  async createLivro(createLivroDto: CreateLivroDto): Promise<ILivro> {
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

  async findAllLivros(): Promise<ILivro[]> {
    try {
      return await this.prisma.livros.findMany();
    } catch (error) {
      throw new Error(`Erro ao buscar livros: ${error}`);
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
          Emprestimos: {
            include: {
              user: {
                select: {
                  nome: true,
                  email: true,
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
      throw new Error(`Erro ao buscar o livro: ${error}`);
    }
  }

  async findLivroByTitulo(titulo: string): Promise<ILivro> {
    try {
      return await this.prisma.livros.findFirst({
        where: { titulo },
      });
    } catch (error) {
      throw new Error(`Erro ao buscar livro por título: ${error}`);
    }
  }

  async updateLivroById(
    id: string,
    updateLivroDto: UpdateLivroDto,
  ): Promise<{ message: string }> {
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

      return { message: 'Livro atualizado com sucesso!' };
    } catch (error) {
      throw new Error(`Erro ao atualizar livro: ${error}`);
    }
  }

  async deleteLivroById(id: string): Promise<{ message: string }> {
    try {
      await this.prisma.livros.delete({
        where: { id },
      });

      return { message: 'Livro deletado com sucesso!' };
    } catch (error) {
      throw new Error(`Erro ao deletar livro: ${error}`);
    }
  }
}
