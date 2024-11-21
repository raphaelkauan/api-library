import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { UsersModule } from './modules/users/users.module';
import { LivroModule } from './modules/livros/livro.module';

@Module({
  imports: [UsersModule, LivroModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
