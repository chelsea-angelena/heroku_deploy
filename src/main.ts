import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 5002;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`listening on port: ${await app.getUrl()}`);
}
bootstrap();
