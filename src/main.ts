import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { addingSwagger } from './shared/settings/swagger-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  addingSwagger(app);

  await app.listen(3000);

  app.useGlobalPipes(new ValidationPipe());
}
bootstrap();
