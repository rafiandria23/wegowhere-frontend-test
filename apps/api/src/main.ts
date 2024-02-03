import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  const configService = app.get(ConfigService);

  // OpenAPI (Swagger)
  const config = new DocumentBuilder()
    .setTitle('WeGoWhere Frontend Test - Payment API')
    .setDescription('Frontend Test for WeGoWhere.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  const apiHost = configService.get<string>('api.host');
  const apiPort = configService.get<number>('api.port');

  await app.listen(apiPort, apiHost);

  Logger.log(`🚀 API is running on: http://${apiHost}:${apiPort}`);
}

bootstrap();
