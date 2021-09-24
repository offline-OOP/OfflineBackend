import { NestFactory } from '@nestjs/core';
import { Index } from '#Modules/App';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(Index);
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Offline backend')
    .setDescription('The offline backend API description')
    .setVersion('1.0')
    .addTag('Offline')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const config = app.get(ConfigService);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const port = config.get('PORT', 3000);

  await app.listen(port);
}
bootstrap();
