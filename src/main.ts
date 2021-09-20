import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Index } from '#Modules/App';

async function bootstrap() {
  const app = await NestFactory.create(Index);

  const config = new DocumentBuilder()
    .setTitle('OFFLINE Backend')
    .setDescription('Backend of OFFLINE web-service')
    .setVersion('1.0')
    // .addTag()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
