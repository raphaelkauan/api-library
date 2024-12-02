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
        'esse livro já está esgotado',
        HttpStatus.CONFLICT,
      );
    } else if (userValidation) {
      throw new HttpException(
        'esse usuário já pegou esse livro',
        HttpStatus.CONFLICT,
      );
    }

    await this.emprestarRepository.emprestarLivro(emprestarLivroDto);

    return { message: 'livro emprestado com sucesso' };
  }

  async devolucaoLivro(devolucaoLivro: DevolucaoLivroDto) {
    const userValidation =
      await this.emprestarRepository.findEmprestimoByUserAndLivro(
        devolucaoLivro.userId,
        devolucaoLivro.livroId,
      );

    const validationDataDevolucao =
      await this.emprestarRepository.validationDataDevolucao(
        devolucaoLivro.livroId,
      );

    if (userValidation == true) {
      await this.emprestarRepository.devolucaoLivro(devolucaoLivro);

      return validationDataDevolucao;
    } else {
      throw new HttpException(
        'esse usário não pegou esse livro',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async historicoEmprestimoAndDevolucao() {
    return await this.emprestarRepository.historicoEmprestimoAndDevolucao();
  }
}
