import { NestFactory } from '@nestjs/core';
import { SwaggerModuleOptions } from './swagger.module';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5002;

  app.enableCors();

  app.use(json({ limit: '1000mb' }));

  app.use(urlencoded({ extended: true, limit: '1000mb' }));

  app.setGlobalPrefix('api');
  SwaggerModuleOptions(app);

  await app.listen(port);
}
bootstrap();
