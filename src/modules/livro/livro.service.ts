import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLivroDto } from './dto/CreateLivro.dto';
import { LivroRepository } from './livro.repository';
import { GeneroLivro } from '../../shared/enums/genero.enum';
import { UpdateLivroDto } from './dto/UpdateLivro.dto';

@Injectable()
export class LivroService {
  constructor(private readonly livroRepository: LivroRepository) {}

  async createLivro(createLivroDto: CreateLivroDto) {
    const livroValidation = await this.livroRepository.findLivroByTitulo(
      createLivroDto.titulo,
    );

    if (livroValidation) {
      throw new HttpException(
        'esse título já está cadastrado!',
        HttpStatus.CONFLICT,
      );
    } else if (!Object.values(GeneroLivro).includes(createLivroDto.genero)) {
      throw new HttpException(
        'o gênero fornecido é inválido!',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.livroRepository.createLivro(createLivroDto);
      return { message: 'livro cadastrado com sucesso!' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllLivros() {
    return await this.livroRepository.findAllLivros();
  }

  async findLivroById(id: string) {
    return await this.livroRepository.findLivroById(id);
  }

  async updateLivroById(id: string, updateLivroDto: UpdateLivroDto) {
    try {
      const livro = await this.livroRepository.findLivroById(id);

      if (!livro.livro) {
        throw new HttpException(
          'esse livro não existe!',
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.livroRepository.updateLivroById(id, updateLivroDto);
    } catch (error) {
      throw new Error(`erro ao atualizar livro: ${error}`);
    }
  }

  async deleteLivroById(id: string) {
    try {
      const livro = await this.livroRepository.findLivroById(id);

      if (!livro.livro) {
        throw new HttpException(
          'esse livro não existe!',
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.livroRepository.deleteLivroById(id);
    } catch (error) {
      throw new Error(`erro ao deletar livro: ${error}`);
    }
  }
}
