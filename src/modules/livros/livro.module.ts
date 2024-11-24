import { Module } from '@nestjs/common';
import { LivroService } from './livro.service';
import { LivroController } from './livro.controller';
import { LivroRepository } from './livro.repository';
import { PrismaService } from 'src/database/prisma.service';
import { EmprestarModule } from '../emprestimo/emprestar.module';

@Module({
  imports: [EmprestarModule],
  controllers: [LivroController],
  providers: [LivroService, LivroRepository, PrismaService],
})
export class LivroModule {}
