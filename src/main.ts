import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import { NestFactory } from '@nestjs/core';

import { ConfigVariables, VALIDATION_PIPE_OPTIONS } from './common/constants';
import { FirebaseConfig } from './integrations';
import { AppModule } from './app.module';

(async function () {
  const app: INestApplication = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get<number>(ConfigVariables.PORT);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  new FirebaseConfig(configService).initConnection();
  //new SentryConfig(configService).initConnection();

  app.useGlobalPipes(new ValidationPipe(VALIDATION_PIPE_OPTIONS));
  app.enableCors();

  await app.listen(port);

  console.log(`Nest.JS is listening on ${port} port`);
})();
