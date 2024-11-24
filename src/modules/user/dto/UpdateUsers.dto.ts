import { CreateUsersDto } from "./CreateUsers.dto";
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUsersDto extends PartialType(CreateUsersDto){}