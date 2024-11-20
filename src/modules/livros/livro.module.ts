import { Module } from '@nestjs/common';
import { LivroService } from './livro.service';
import { LivroController } from './livro.controller';

@Module({
  controllers: [LivroController],
  providers: [LivroService],
})
export class LivrosModule {}
