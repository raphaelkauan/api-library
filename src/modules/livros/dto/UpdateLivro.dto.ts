import { CreateLivroDto } from './CreateLivro.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateLivroDto extends PartialType(CreateLivroDto) {}
