import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get()
  async findAllLivros() {
    return await this.livroService.findAllLivros();
  }

  @Get(':id')
  async findLivroById(@Param('id') id: string) {
    return await this.livroService.findLivroById(id);
  }
}
