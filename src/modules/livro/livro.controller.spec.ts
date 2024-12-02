import { Test, TestingModule } from '@nestjs/testing';
import { LivroController } from '../../modules/livro/livro.controller';
import { LivroService } from '../../modules/livro/livro.service';
import { GeneroLivro } from '../../shared/enums/genero.enum';
import { CreateLivroDto } from './dto/CreateLivro.dto';

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
    it('CRIAR LIVRO', async () => {
      //Verifica a funcionalidade da rota
      expect(livroController.createLivro).toBeDefined();

      //Teste para o fluxo de criação de LIVRO
      const createLivroDto: CreateLivroDto = {
        "titulo": "{{$randomFirstName}}",
        "autor": "tes1221tae",
        "anoPublicacao": 2004,
        "genero": GeneroLivro.drama,
        "quantidade": 12
    };
      const result = {
        id: '876e6eb3-652f-46ed-ab57-044c9fc80ae9',
        ...createLivroDto,
      };
      jest.spyOn(livroService, 'createLivro').mockResolvedValue({"message": "livro cadastrado com sucesso!"});

      expect(await livroController.createLivro(createLivroDto)).toEqual({"message": "livro cadastrado com sucesso!"});
      expect(livroService.createLivro).toHaveBeenCalledWith(createLivroDto);
    });



    it('BUSCAR LIVROS', async () => {
      //Verifica a funcionalidade da rota
      expect(livroController.findAllLivros).toBeDefined();

      //Teste para o fluxo de busca de todos os LIVROS
      const findAllLivros = [
        {
            "titulo": "{{$randomFirstName}}",
            "autor": "tes1221tae",
            "anoPublicacao": 2004,
            "genero": GeneroLivro.drama,
            "quantidade": 12
        },

        {
            "titulo": "{{$randomFirstName}}",
            "autor": "tes1221teste",
            "anoPublicacao": 2008,
            "genero": GeneroLivro.misterio,
            "quantidade": 10
        },
      ];

      //@ts-ignore
      jest.spyOn(livroService, 'findAllLivros').mockResolvedValue(findAllLivros);
      const result = await livroController.findAllLivros();
      expect(result).toEqual(findAllLivros);
      expect(livroService.findAllLivros).toHaveBeenCalled();
    });


      it('BUSCAR LIVRO POR ID', async () => {
        // Verifica se a funcionalidade de buscar livro por ID está definida
        expect(livroController.findLivroById).toBeDefined();
    
        // Dados simulados do livro a ser retornado
        const livroMock = {
          id: '876e6eb3-652f-46ed-ab57-044c9fc80ae9',
          titulo: 'Meu livro',
          autor: 'tes1221tae',
          anoPublicacao: 2004,
          genero: GeneroLivro.drama,
          quantidade: 12,
        };
    
        // Simula a resposta do serviço findLivroById
              //@ts-ignore
        jest.spyOn(livroService, 'findLivroById').mockResolvedValue(livroMock);
    
        // Chama o controller e verifica a resposta
        expect(await livroController.findLivroById('876e6eb3-652f-46ed-ab57-044c9fc80ae9')).toEqual(livroMock);
        
        // Verifica se o serviço foi chamado com o id correto
        expect(livroService.findLivroById).toHaveBeenCalledWith('876e6eb3-652f-46ed-ab57-044c9fc80ae9');
      });
    
      it('ATUALIZAR LIVRO POR ID', async () => {
        const id = '876e6eb3-652f-46ed-ab57-044c9fc80ae9'; // ID do livro a ser atualizado
        const updateLivroDto = {
          titulo: 'Novo Título',
          autor: 'Novo Autor',
          anoPublicacao: 2023,
          genero: GeneroLivro.drama,
          quantidade: 15,
          id: id,
        };
    
        const result = {
          id,
          ...updateLivroDto,
        };
    
        // Mock do método 'updateLivroById' do livroService
        //@ts-ignore
        jest.spyOn(livroService, 'updateLivroById').mockResolvedValue(result);
    
        // Verifica se o método 'updateLivroById' está definido
        expect(livroController.updateLivroById).toBeDefined();
    
        // Chama o controlador e verifica se a resposta é a esperada
        expect(await livroController.updateLivroById(id, updateLivroDto)).toEqual(result);
    
        // Verifica se o método do serviço foi chamado corretamente com os parâmetros esperados
        expect(livroService.updateLivroById).toHaveBeenCalledWith(id, updateLivroDto);
      });
    });
      
      

  it('DELETAR LIVRO POR ID', async () => {
    const id = '876e6eb3-652f-46ed-ab57-044c9fc80ae9'; // ID do livro a ser deletado

    // Mock do método 'deleteLivroById' do livroService
    jest.spyOn(livroService, 'deleteLivroById').mockResolvedValue(undefined); // Simula a exclusão sem retorno

    // Verifica se o método 'deleteLivroById' está definido
    expect(livroController.deleteLivroById).toBeDefined();

    // Chama o controlador e verifica se a resposta é undefined (não retorna nada após a exclusão)
    expect(await livroController.deleteLivroById(id)).toBeUndefined();

    // Verifica se o método do serviço foi chamado corretamente com o parâmetro esperado (id)
    expect(livroService.deleteLivroById).toHaveBeenCalledWith(id);
  });
});