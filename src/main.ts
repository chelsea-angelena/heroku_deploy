import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5002;

  app.enableCors();

  app.use(json({ limit: '1000mb' }));

  app.use(urlencoded({ extended: true, limit: '1000mb' }));

  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Image App Api')
    .setDescription(
      'Routes requests from front end React-Native to/from Clarifai API',
    )
    .setVersion('2.0')
    .addTag('image_app')
    .build();

  const Document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, Document);

  await app.listen(port);
}
bootstrap();
