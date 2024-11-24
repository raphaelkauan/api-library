import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmprestarRepository } from './emprestar.repository';
import { EmprestarLivroDto } from './dto/emprestar.dto';
import { DevolucaoLivroDto } from './dto/devolucao.dto';

@Injectable()
export class EmprestarService {
  constructor(private readonly emprestarRepository: EmprestarRepository) {}

  async createEmprestarLivro(emprestarLivroDto: EmprestarLivroDto) {
    const validationQuantidadeLivro =
      await this.emprestarRepository.findQuantidadeLivro(
        emprestarLivroDto.livroId,
      );

    const userValidation =
      await this.emprestarRepository.findEmprestimoByUserAndLivro(
        emprestarLivroDto.userId,
        emprestarLivroDto.livroId,
      );

    if (validationQuantidadeLivro.quantidade == 0) {
      throw new HttpException(
        'Esse livro já está esgotado!',
        HttpStatus.CONFLICT,
      );
    } else if (userValidation) {
      throw new HttpException(
        'Esse usuário já pegou esse livro!',
        HttpStatus.CONFLICT,
      );
    }

    await this.emprestarRepository.emprestarLivro(emprestarLivroDto);

    return { message: 'Livro emprestado com sucesso!' };
  }

  async devolucaoLivro(devolucaoLivro: DevolucaoLivroDto) {
    const userValidation =
      await this.emprestarRepository.findEmprestimoByUserAndLivro(
        devolucaoLivro.userId,
        devolucaoLivro.livroId,
      );

    if (userValidation == true) {
      await this.emprestarRepository.devolucaoLivro(devolucaoLivro);
    } else {
      throw new HttpException(
        'Esse usário não pegou esse livro',
        HttpStatus.BAD_REQUEST,
      );
    }

    return { message: 'Livro devolvido com sucesso!' };
  }
}
