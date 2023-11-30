import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const globalPrefix = config.get<string>('API_PREFIX');
  const port = config.get<number>('API_PORT');

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(globalPrefix);

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
