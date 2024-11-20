
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUsersDto {
    id?: string
    
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(["aluno", "professor","admin"])
    @IsNotEmpty()
    tipoUser: "aluno" | "professor" | "admin" ;
}
