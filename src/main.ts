import { NestFactory } from '@nestjs/core';
import { Index } from '#App/app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
//import { ConfigService } from '@nestjs/config';

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
  await app.listen(3000);
}
bootstrap();
