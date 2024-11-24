import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { EmprestarLivroDto } from './dto/emprestar.dto';

@Injectable()
export class EmprestarRepository {
  constructor(private readonly prisma: PrismaService) {}

  async emprestarLivro(emprestarLivroDto: EmprestarLivroDto) {
    const detailsEmprestar = await this.prisma.emprestimos.create({
      data: {
        dataEmprestimo: emprestarLivroDto.dataEmprestimo,
        dataDevolucao: emprestarLivroDto.dataDevolucao,
        estadoLivro: emprestarLivroDto.estadoLivro,
        userId: emprestarLivroDto.userId,
        livroId: emprestarLivroDto.livroId,
      },
    });

    await this.registerHistorico({
      idEmprestimo: detailsEmprestar.id,
      dataEmprestimo: detailsEmprestar.dataEmprestimo,
      dataDevolucao: detailsEmprestar.dataDevolucao,
      estadoLivro: detailsEmprestar.estadoLivro,
      userId: detailsEmprestar.userId,
      livroId: detailsEmprestar.livroId,
    });
  }

  async registerHistorico(emprestarLivroDto: EmprestarLivroDto) {
    await this.prisma.historico.create({
      data: {
        idEmprestimo: emprestarLivroDto.idEmprestimo,
        dataEmprestimo: emprestarLivroDto.dataEmprestimo,
        dataDevolucao: emprestarLivroDto.dataDevolucao,
        estadoLivro: emprestarLivroDto.estadoLivro,
        userId: emprestarLivroDto.userId,
        livroId: emprestarLivroDto.livroId,
      },
    });
  }
}
