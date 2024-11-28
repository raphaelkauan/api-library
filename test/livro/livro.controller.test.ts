import { LivroController } from './livro.controlle';
import { LivroService } from './livro.service';
import { Test, TestingModule } from '@nestjs/testing';

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
      const result = [{ id: 1, titulo: 'Livro 1' }];
      jest.spyOn(livroService, 'findAllLivros').mockResolvedValue(result);

      expect(await livroController.findAllLivros()).toBe(result);
      expect(livroService.findAllLivros).toHaveBeenCalled();
    });

    it('BUSCAR LIVRO POR ID', async () => {
      const result = { id: 1, titulo: 'Livro 1' };
      jest.spyOn(livroService, 'findLivroById').mockResolvedValue(result);

      expect(await livroController.findLivroById(1)).toBe(result);
      expect(livroService.findLivroById).toHaveBeenCalledWith(1);
    });

    it('CRIAR LIVRO', async () => {
      const newLivro = { titulo: 'Novo Livro' };
      const result = { id: 1, ...newLivro };
      jest.spyOn(livroService, 'createLivro').mockResolvedValue(result);

      expect(await livroController.createLivro(newLivro)).toBe(result);
      expect(livroService.createLivro).toHaveBeenCalledWith(newLivro);
    });

    it('ATUALIZAR LIVRO POR ID', async () => {
      const updateData = { titulo: 'Livro Atualizado' };
      const result = { id: 1, ...updateData };
      jest.spyOn(livroService, 'updateLivroById').mockResolvedValue(result);

      expect(await livroController.updateLivroById(1, updateData)).toBe(result);
      expect(livroService.updateLivroById).toHaveBeenCalledWith(1, updateData);
    });

    it('DELETAR LIVRO POR ID', async () => {
      jest.spyOn(livroService, 'deleteLivroById').mockResolvedValue(undefined);

      expect(await livroController.deleteLivroById(1)).toBeUndefined();
      expect(livroService.deleteLivroById).toHaveBeenCalledWith(1);
    });
  });
});
