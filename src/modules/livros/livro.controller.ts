import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LivroService } from './livro.service';
import { CreateLivroDto } from './dto/CreateLivro.dto';
import { UpdateLivroDto } from './dto/UpdateLivro.dto';
import { ILivro } from 'src/shared/interfaces/livro.interface';

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
  async findAllLivros(): Promise<ILivro[]> {
    return await this.livroService.findAllLivros();
  }

  @Get(':id')
  async findLivroById(@Param('id') id: string) {
    return await this.livroService.findLivroById(id);
  }

  @Patch(':id')
  async updateLivroById(
    @Param('id') id: string,
    @Body() updateLivroDto: UpdateLivroDto,
  ): Promise<{ message: string }> {
    return await this.livroService.updateLivroById(id, updateLivroDto);
  }

  @Delete(':id')
  async deleteLivroById(@Param('id') id: string): Promise<{ message: string }> {
    return await this.livroService.deleteLivroById(id);
  }
}
