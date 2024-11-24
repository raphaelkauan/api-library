import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { UsersModule } from './modules/user/users.module';
import { LivroModule } from './modules/livro/livro.module';
import { EmprestarModule } from './modules/emprestar/emprestar.module';

@Module({
  imports: [UsersModule, LivroModule, EmprestarModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
