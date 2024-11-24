import { Body, Controller, Post } from '@nestjs/common';
import { EmprestarService } from './emprestar.service';
import { EmprestarLivroDto } from './dto/emprestar.dto';

@Controller('emprestar')
export class EmprestarController {
  constructor(private readonly emprestarService: EmprestarService) {}

  @Post()
  async createEmprestarLivro(@Body() emprestarLivroDto: EmprestarLivroDto) {
    return await this.emprestarService.createEmprestarLivro(emprestarLivroDto);
  }
}
