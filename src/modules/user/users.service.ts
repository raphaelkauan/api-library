import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/CreateUsers.dto';
import { UpdateUsersDto } from './dto/UpdateUsers.dto';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUsersDto) {
    return  await this.prisma.users.create({ data });
  }

  async findAll() {
    return await this.prisma.users.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.users.findUnique({ where: { id } });
  }

  async update(id: string, updateUsersDto: UpdateUsersDto) {
    return await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        ...updateUsersDto,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.users.delete({ where: { id } });
  }
}
