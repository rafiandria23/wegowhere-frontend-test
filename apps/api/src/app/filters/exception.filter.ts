import _ from 'lodash';
import { HttpAdapterHost } from '@nestjs/core';
import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  ExceptionFilter as NestExceptionFilter,
} from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { isString } from 'tipe-apa';

import { AppService } from '../app.service';

@Catch()
export class ExceptionFilter
  implements NestExceptionFilter<HttpException | Error>
{
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost<FastifyAdapter>,
    private readonly appService: AppService
  ) {}

  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const httpHost = host.switchToHttp();

    const { httpAdapter } = this.httpAdapterHost;

    let errStatus: HttpStatus = _.defaultTo(
      _.get(exception, 'status'),
      HttpStatus.INTERNAL_SERVER_ERROR
    );
    let errData: string | object = _.defaultTo(
      _.get(exception, 'data'),
      'Oops! Something unexpected occurred.'
    );

    if (exception instanceof HttpException) {
      errStatus = exception.getStatus();
      errData = _.get(
        _.omit(exception.getResponse() as object, ['statusCode', 'error']),
        'message'
      );
    }

    if (isString(errData)) {
      errData = {
        message: errData,
      };
    }

    return httpAdapter.reply(
      httpHost.getResponse(),
      this.appService.successTimestamp({
        success: false,
        data: errData,
      }),
      errStatus
    );
  }
}
