import { Module } from '@nestjs/common';
import { LivroService } from './livro.service';
import { LivroController } from './livro.controller';
import { LivroRepository } from './livro.repository';
import { PrismaService } from '../../database/prisma.service';
import { EmprestarModule } from '../emprestar/emprestar.module';

@Module({
  imports: [EmprestarModule],
  controllers: [LivroController],
  providers: [LivroService, LivroRepository, PrismaService],
  exports: [PrismaService],
})
export class LivroModule {}
