import { Body, Controller, Post } from '@nestjs/common';
import { LivroService } from './livro.service';
import { CreateLivroDto } from './dto/CreateLivro.dto';

@Controller('livro')
export class LivroController {
  constructor(private readonly livroService: LivroService) {}

  @Post()
  async createLivro(
    @Body() createLivroDto: CreateLivroDto,
  ): Promise<{ message: string }> {
    return await this.livroService.createLivro(createLivroDto);
  }
}
