import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmprestarRepository } from './emprestar.repository';
import { EmprestarLivroDto } from './dto/emprestar.dto';

@Injectable()
export class EmprestarService {
  constructor(private readonly emprestarRepository: EmprestarRepository) {}

  async createEmprestarLivro(emprestarLivroDto: EmprestarLivroDto) {
    const validationLivroEmprestimo =
      await this.emprestarRepository.validationLivroEmprestimo(
        emprestarLivroDto.livroId,
      );

    console.log(validationLivroEmprestimo.message);

    if (validationLivroEmprestimo.message === 'livro emprestado!')
      throw new HttpException(
        'Esse livro já está emprestado!',
        HttpStatus.CONFLICT,
      );

    await this.emprestarRepository.emprestarLivro(emprestarLivroDto);

    return { message: 'Livro emprestado com sucesso!' };
  }

  async devolucaoLivro(livroId: string) {
    await this.emprestarRepository.devolucaoLivro(livroId);

    return { message: 'Livro devolvido com sucesso!' };
  }
}
