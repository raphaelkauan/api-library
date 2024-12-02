import { Test, TestingModule } from '@nestjs/testing';
import { EmprestarService } from './emprestar.service';
import { EmprestarRepository } from './emprestar.repository';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('EmprestarService', () => {
  let service: EmprestarService;
  let repository: EmprestarRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmprestarService,
        {
          provide: EmprestarRepository,
          useValue: {
            findQuantidadeLivro: jest.fn(),
            findEmprestimoByUserAndLivro: jest.fn(),
            emprestarLivro: jest.fn(),
            devolucaoLivro: jest.fn(),
            validationDataDevolucao: jest.fn(), 
          },
        },
      ],
    }).compile();

    service = module.get<EmprestarService>(EmprestarService);
    repository = module.get<EmprestarRepository>(EmprestarRepository);
  });

  it('deve lançar erro se o livro estiver esgotado', async () => {
    (repository.findQuantidadeLivro as jest.Mock).mockResolvedValue({
      quantidade: 0,
    });

   const emprestarLivroDto = {
        userId: "ec15582a-99cb-4075-a671-69316f23adff",
        livroId: "6a4aef3d-aec4-422c-8206-8813dad95ffb",
        idEmprestimo: "random-id",
        estadoLivro: "bom",
        dataDevolucao:  new Date(),
    }
    await expect(
      service.createEmprestarLivro(emprestarLivroDto),
    ).rejects.toThrow(new HttpException('esse livro já está esgotado', HttpStatus.CONFLICT));
  });

  it('deve lançar erro se o usuário já pegou o livro', async () => {
    (repository.findQuantidadeLivro as jest.Mock).mockResolvedValue({
      quantidade: 1,
    });
    (repository.findEmprestimoByUserAndLivro as jest.Mock).mockResolvedValue(
      true,
    );

    const emprestarLivroDto = {
        userId: "ec15582a-99cb-4075-a671-69316f23adff",
        livroId: "6a4aef3d-aec4-422c-8206-8813dad95ffb",
        idEmprestimo: "random-id",
        estadoLivro: "bom",
        dataDevolucao: new Date(),
    }
    await expect(
      service.createEmprestarLivro(emprestarLivroDto),
    ).rejects.toThrow(
      new HttpException('esse usuário já pegou esse livro', HttpStatus.CONFLICT),
    );
  });

  it('deve emprestar o livro com sucesso', async () => {
    (repository.findQuantidadeLivro as jest.Mock).mockResolvedValue({
      quantidade: 1,
    });
    (repository.findEmprestimoByUserAndLivro as jest.Mock).mockResolvedValue(
      null,
    );
    (repository.emprestarLivro as jest.Mock).mockResolvedValue(undefined);

   const emprestarLivroDto = {
        userId: "ec15582a-99cb-4075-a671-69316f23adff",
        livroId: "6a4aef3d-aec4-422c-8206-8813dad95ffb",
        idEmprestimo: "random-id",
        estadoLivro: "bom",
        dataDevolucao: new Date(),
    }

    const result = await service.createEmprestarLivro(emprestarLivroDto);

    expect(repository.findQuantidadeLivro).toHaveBeenCalledWith(emprestarLivroDto.livroId);
    expect(repository.findEmprestimoByUserAndLivro).toHaveBeenCalledWith(emprestarLivroDto.userId, emprestarLivroDto.livroId);
    expect(repository.emprestarLivro).toHaveBeenCalledWith(emprestarLivroDto);
    expect(result).toEqual({ message: 'livro emprestado com sucesso' });
  });


  it('deve devolver o livro com sucesso', async ()=> {
    (repository.findEmprestimoByUserAndLivro as jest.Mock).mockResolvedValue(true);
    (repository.validationDataDevolucao as jest.Mock).mockResolvedValue({
    dataDevolucao: '2024-12-10',
    });
    (repository.devolucaoLivro as jest.Mock).mockResolvedValue(undefined);

      const devolverLivroDto = {
        userId: "ec15582a-99cb-4075-a671-69316f23adff",
        livroId: "6a4aef3d-aec4-422c-8206-8813dad95ffb",
        idEmprestimo: "random-id",
        estadoLivro: "bom",
    }
    const result = await service.devolucaoLivro(devolverLivroDto);
    expect(repository.findEmprestimoByUserAndLivro).toHaveBeenCalledWith(devolverLivroDto.userId, devolverLivroDto.livroId);
    expect(repository.validationDataDevolucao).toHaveBeenCalledWith(devolverLivroDto.livroId);
    expect(repository.devolucaoLivro).toHaveBeenCalledWith(devolverLivroDto);
    expect(result).toEqual({ message: 'livro devolvido com sucesso', validationData: { dataDevolucao: '2024-12-10' }});
  })
})
