import { NestFactory } from '@nestjs/core';
import { Index } from '#Modules/App';

async function bootstrap() {
  const app = await NestFactory.create(Index);
  await app.listen(3000);
}
bootstrap();
