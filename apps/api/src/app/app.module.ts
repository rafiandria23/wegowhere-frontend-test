import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { BadRequestException, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import apiConfig from './configs/api.config';
import dbConfig from './configs/db.config';
import { PaymentCard, PaymentCardSchema } from './schemas/payment-card.schema';
import { ExceptionFilter } from './filters/exception.filter';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [apiConfig, dbConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      async useFactory(configService: ConfigService) {
        return {
          uri: `mongodb://${configService.get<string>(
            'db.host'
          )}:${configService.get<number>('db.port')}`,
          user: configService.get<string>('db.user'),
          pass: configService.get<string>('db.pass'),
          dbName: configService.get<string>('db.name'),
        };
      },
    }),
    MongooseModule.forFeature([
      {
        name: PaymentCard.name,
        schema: PaymentCardSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useFactory() {
        return new ValidationPipe({
          exceptionFactory(data) {
            return new BadRequestException(data);
          },
          validationError: {
            target: false,
            value: false,
          },
        });
      },
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
  ],
})
export class AppModule {}
