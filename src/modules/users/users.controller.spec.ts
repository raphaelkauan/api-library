import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TipoUser } from '@prisma/client';
import { CreateUsersDto } from './dto/CreateUsers.dto';
import { UpdateUsersDto } from './dto/UpdateUsers.dto';

describe('UsersControllers', () => {
  let usersControlle: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn()
          },
        },
      ],
    }).compile();

    usersControlle = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('TESTAR ROTAS DE USUÁRIO', () => {
    
    it("CRIAR USUÁRIO", async ()=>{
      //Verifica a funcionalidade da rota
      expect(usersControlle.create).toBeDefined();

      //Teste para o fluxo de criação de usuário
      const createUsersDto: CreateUsersDto = {
        nome: 'John Doe', 
        email: 'john@example.com', 
        password: "1234Ga", 
        tipoUser: TipoUser.aluno
      };
       const result = {
      id: '876e6eb3-652f-46ed-ab57-044c9fc80ae9',
      ...createUsersDto,
      };
      jest.spyOn(usersService, 'create').mockResolvedValue(result);

      expect(await usersControlle.create(createUsersDto)).toEqual(result);
      expect(usersService.create).toHaveBeenCalledWith(createUsersDto);
    });

    it('BUSCAR USUÁRIOS', async () => {
      
      //Verifica a funcionalidade da rota
      expect(usersControlle.findAll).toBeDefined();

      //Teste para o fluxo de busca de todos os usuário
      const findAllUsers = [{
        id: '876e6eb3-652f-46ed-ab57-044c9fc80ae9',
        nome: 'John Doe', 
        email: 'john@example.com', 
        password: "1234Ga", 
        tipoUser: TipoUser.aluno
      },
      {
        id: '876e6eb3-652f-46ed-ab57-044c9fc70ae9',
        nome: 'John Doe', 
        email: 'john@example.com', 
        password: "1234Ga", 
        tipoUser: TipoUser.aluno
      }];
      
      //@ts-ignore
      jest.spyOn(usersService, 'findAll').mockResolvedValue(findAllUsers);
      const result = await usersControlle.findAll();
      expect(result).toEqual(findAllUsers);
      expect(usersService.findAll).toHaveBeenCalled();
      
    });
    it('BUSCAR USUÁRIOS ÚNICO', async () => {
      const id = '876e6eb3-652f-46ed-ab57-044c9fc80ae9'

      //Verifica a funcionalidade da rota
      expect(usersControlle.findOne).toBeDefined();

      //Teste para o fluxo de buscar usuário único
      const findOneUser = {
        nome: 'John Doe', 
        email: 'john@example.com', 
        password: "1234Ga", 
        tipoUser: TipoUser.aluno
      }
      const result = {
        id,
      ...findOneUser
      }
      jest.spyOn(usersService, 'findOne').mockResolvedValue(result);
      expect(await usersControlle.findOne(id)).toEqual(result);
      expect(usersService.findOne).toHaveBeenCalledWith(id);

    });
    it("ATUALIZA USUÁRIO", async ()=> {
       const id = '876e6eb3-652f-46ed-ab57-044c9fc80ae9';

      //Verifica a funcionalidade da rota
      expect(usersControlle.update).toBeDefined();

      //Teste para o fluxo de atualizar usuário 
      const updateUsers = {
        nome: 'John Doe', 
        email: 'john@example.com', 
        password: "1234Ga", 
        tipoUser: TipoUser.aluno
      };
       const result = {
        id,
      ...updateUsers,
      };
      jest.spyOn(usersService, "update").mockResolvedValue(result);
      expect(await usersControlle.update(id, updateUsers)).toEqual(result);
      expect(usersService.update).toHaveBeenCalledWith(id, updateUsers);

    });

    it("DELETA USUÁRIO", async ()=>{
      const id = '876e6eb3-652f-46ed-ab57-044c9fc80ae9'

      //Verifica a funcionalidade da rota
      expect(usersControlle.remove).toBeDefined();

      //Teste para o fluxo de deletar usuário
      const removeUser = {
        nome: 'John Doe', 
        email: 'john@example.com', 
        password: "1234Ga", 
        tipoUser: TipoUser.aluno
      }
      const result = {
        id,
      ...removeUser
      }
      jest.spyOn(usersService, "remove").mockResolvedValue(result);
      expect(await usersControlle.remove(id)).toEqual(result);
      expect(usersService.remove).toHaveBeenCalledWith(id);
    })
  });
});
