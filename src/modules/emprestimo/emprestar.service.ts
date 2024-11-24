import { Injectable } from '@nestjs/common';
import { EmprestarRepository } from './emprestar.repository';
import { EmprestarLivroDto } from './dto/emprestar.dto';

@Injectable()
export class EmprestarService {
  constructor(private readonly emprestarRepository: EmprestarRepository) {}

  async createEmprestarLivro(emprestarLivroDto: EmprestarLivroDto) {
    return await this.emprestarRepository.emprestarLivro(emprestarLivroDto);
  }
}
