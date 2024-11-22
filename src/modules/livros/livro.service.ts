import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLivroDto } from './dto/CreateLivro.dto';
import { LivroRepository } from './livro.repository';
import { GeneroLivro } from 'src/shared/enums/genero.enum';
import { ILivro } from 'src/shared/interfaces/livro.interface';

@Injectable()
export class LivroService {
  constructor(private readonly livroRepository: LivroRepository) {}

  async createLivro(
    createLivroDto: CreateLivroDto,
  ): Promise<{ message: string }> {
    const livroValidation = await this.livroRepository.findLivroByTitulo(
      createLivroDto.titulo,
    );

    if (livroValidation) {
      throw new HttpException(
        'Esse título já está cadastrado!',
        HttpStatus.CONFLICT,
      );
    } else if (!Object.values(GeneroLivro).includes(createLivroDto.genero)) {
      throw new HttpException(
        'O gênero fornecido é inválido!',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.livroRepository.createLivro(createLivroDto);
      return { message: 'Livro cadastrado com sucesso!' };
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
}
