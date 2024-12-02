import { Test, TestingModule } from '@nestjs/testing';
import { LivroController } from '../../modules/livro/livro.controller';
import { LivroService } from '../../modules/livro/livro.service';
import { GeneroLivro } from '../../shared/enums/genero.enum';

describe('LivroController', () => {
  let livroController: LivroController;
  let livroService: LivroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivroController],
      providers: [
        {
          provide: LivroService,
          useValue: {
            createLivro: jest.fn(),
            findAllLivros: jest.fn(),
            findLivroById: jest.fn(),
            updateLivroById: jest.fn(),
            deleteLivroById: jest.fn(),
          },
        },
      ],
    }).compile();

    livroController = module.get<LivroController>(LivroController);
    livroService = module.get<LivroService>(LivroService);
  });

  describe('TESTAR ROTAS DE LIVRO', () => {
    it('BUSCAR LIVROS', async () => {
      expect(livroController.findAllLivros).toBeDefined();
    });

    // it('BUSCAR LIVRO POR ID', async () => {
    //   expect(livroService.findLivroById).toBeDefined();
    // });

    it('CRIAR LIVRO', async () => {
      const newLivro = {
        titulo: 'Meu livro',
        autor: 'eu',
        anoPublicacao: 2004,
        genero: GeneroLivro.drama,
        quantidade: 12,
      };

      const result = {
        message: 'livro cadastrado com sucesso!',
      };

      expect(await livroController.createLivro(newLivro)).toEqual(result);
    });

    // it('ATUALIZAR LIVRO POR ID', async () => {
    //   const updateData = { titulo: 'Livro Atualizado' };
    //   const result = { id: 1, ...updateData };
    //   jest.spyOn(livroService, 'updateLivroById').mockResolvedValue(result);

    //   expect(await livroController.updateLivroById(1, updateData)).toBe(result);
    //   expect(livroService.updateLivroById).toHaveBeenCalledWith(1, updateData);
    // });

    // it('DELETAR LIVRO POR ID', async () => {
    //   jest.spyOn(livroService, 'deleteLivroById').mockResolvedValue(undefined);

    //   expect(await livroController.deleteLivroById(1)).toBeUndefined();
    //   expect(livroService.deleteLivroById).toHaveBeenCalledWith(1);
    // });
  });
});
