import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmprestarService } from './emprestar.service';
import { EmprestarLivroDto } from './dto/emprestar.dto';

@Controller()
export class EmprestarController {
  constructor(private readonly emprestarService: EmprestarService) {}

  @Post('emprestar')
  async createEmprestarLivro(@Body() emprestarLivroDto: EmprestarLivroDto) {
    return await this.emprestarService.createEmprestarLivro(emprestarLivroDto);
  }

  @Get('/devolucao/:livroId')
  async devolucaoLivro(@Param('livroId') livroId: string) {
    return await this.emprestarService.devolucaoLivro(livroId);
  }
}
