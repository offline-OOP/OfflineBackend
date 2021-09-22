import { NestFactory } from '@nestjs/core';
import { Index } from '#Modules/App';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(Index);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
