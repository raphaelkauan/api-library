import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { UsersModule } from './modules/users/users.module';
import { LivroModule } from './modules/livros/livro.module';
import { EmprestarController } from './modules/emprestimo/emprestar.controller';
import { EmprestarModule } from './modules/emprestimo/emprestar.module';

@Module({
  imports: [UsersModule, LivroModule, EmprestarModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
