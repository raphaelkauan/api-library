import { Injectable } from '@nestjs/common';
import { find } from 'rxjs';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUsersDto } from './dto/CreateUsers.dto';
import { UpdateUsersDto } from './dto/UpdateUsers.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    // async create(createUsersDto: CreateUsersDto){
    //     return await this.prisma.users.create({createUsersDto})
    // }


    async create(data: CreateUsersDto ) {
    return await this.prisma.users.create({ data });
  }

    findAll() {
    return this.prisma.users.findMany();
    }
    findOne(id: string) {
        return this.prisma.users.findUnique({ where: {id}})
    }

    async update(id: string, updateUsersDto: UpdateUsersDto) {

        console.log(id)
        console.log(updateUsersDto.nome)

        console.log(updateUsersDto)

        return await this.prisma.users.update({
            where: {
                id
            },
            data: {
                ...updateUsersDto
            }
        })

        
    }

    remove(id: string) {
        return this.prisma.users.delete({where: {id}})
    }

}



