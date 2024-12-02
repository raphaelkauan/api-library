import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const addingSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('API Library')
    .setDescription(
      'Uma API desenvolvida para gerenciar uma biblioteca, incluindo cadastro de livros, cadastro de usuários, controle de empréstimos e devoluções.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document);
};
