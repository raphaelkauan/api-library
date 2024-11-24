import { Module } from '@nestjs/common';
import { EmprestarController } from './emprestar.controller';
import { EmprestarService } from './emprestar.service';
import { PrismaService } from 'src/database/prisma.service';
import { EmprestarRepository } from './emprestar.repository';

@Module({
  controllers: [EmprestarController],
  providers: [EmprestarService, PrismaService, EmprestarRepository],
})
export class EmprestarModule {}
