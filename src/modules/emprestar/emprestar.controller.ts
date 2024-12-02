import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmprestarService } from './emprestar.service';
import { EmprestarLivroDto } from './dto/emprestar.dto';
import { DevolucaoLivroDto } from './dto/devolucao.dto';

@Controller()
export class EmprestarController {
  constructor(private readonly emprestarService: EmprestarService) {}

  @Post('/emprestar')
  async createEmprestarLivro(@Body() emprestarLivroDto: EmprestarLivroDto) {
    return await this.emprestarService.createEmprestarLivro(emprestarLivroDto);
  }

  @Post('/devolucao')
  async devolucaoLivro(@Body() devolucaoLivroDto: DevolucaoLivroDto) {
    return await this.emprestarService.devolucaoLivro(devolucaoLivroDto);
  }

  @Get('/historico')
  async historicoEmprestimoAndDevolucao() {
    return await this.emprestarService.historicoEmprestimoAndDevolucao();
  }
}
