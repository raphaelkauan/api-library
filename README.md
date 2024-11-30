# API-BIBLIOTECA
Interface de aplicação para um gerenciamento de empréstimo de livros de uma biblioteca. A interface registra empréstimo de livros, registrar usuários, cadastrar livros e armazenar o empréstimo dos livros em um histórico. 
Para garantir a integridade da aplicação aplicamos testes unitários e cada end-point para validar seu funcionamento.

### Equipe envolvida
| Pessoa                                  | Cargo           |
|-----------------------------------------|-----------------|
| 👨‍💻 [@gabrielgt5](https://github.com/gabrielgt5/)   | Desenvolvedor   | 
| 👨‍💻 [@raphaelkauan](https://github.com/raphaelkauan/) | Desenvolvedor   |
| 👨‍💻 [@tharlisdavid](https://github.com/tharlisdavid) | Desenvolvedor   |
| 👨‍💻 [@eonarga](https://github.com/eonarga)           | Desenvolvedor   |

## ROADMAP 
[  ] Criação dos CRUDs
[  ] Criação dos teste unitários
[  ] Documentação
[  ] Entrega do projeto

### Tecnologias usadas 
|                                                                                  | Tecnologia  | Descrição                               |
|---------------------------------------------------------------------------------------|-------------|-----------------------------------------|
| <img src="https://icon.icepanel.io/Technology/svg/Jest.svg" alt="Jest" width="80" />  | Jest        | Framework de testes JavaScript.         |
| <img src="https://www.svgrepo.com/show/303360/nodejs-logo.svg" alt="Node.js" width="100" /> | Node.js     | Ambiente de execução JavaScript.        |
| <img src="https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg" alt="NestJS" width="80" /> | NestJS      | Framework para construção de APIs.      |

## Como rodar a API localmente
1. Antes de tudo se certifique de ter o [node instalado](https://www.youtube.com/watch?v=-cLzUD0TQY0) em sua máquina. 
2. Clone o projeto em uma [ferramenta de edição de código](https://code.visualstudio.com/download).
```bash
git clone https://github.com/raphaelkauan/api-library.git
```
3. Instale a dependências de desenvolvimento com o comando: 
```node
npm install
```
4. Após instalar as dependências rode esse comando para realizar a migração no banco de dados:
```node
npx prisma migrate dev --api-biblioteca init
```
5. Após a migração, você pode gerar o cliente Prisma, que é a interface para interagir com o banco de dados:
 ```node
npx prisma generate
```
