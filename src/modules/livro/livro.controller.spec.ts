import { LivroController } from './livro.controller';
import { LivroService } from './livro.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('LivroController', () => {
  let livroController: LivroController;

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
  });

  describe('TESTAR ROTAS DE LIVRO', () => {
    it('BUSCAR LIVROS', async () => {
      expect(livroController.findAllLivros).toBeDefined();
    });
  });
});
