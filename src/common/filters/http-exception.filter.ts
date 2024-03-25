import { ExceptionFilter, ArgumentsHost, HttpStatus, Catch } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { isObject } from '@nestjs/common/utils/shared.utils';
import { Response, Request } from 'express';
import * as Sentry from '@sentry/node';
import { AxiosError } from 'axios';

import { NOT_LOG_ERROR } from '../constants';

type ExceptionResponse = {
  message: string | string[];
  error: string | object;
  statusCode: number;
  appVersion?: string;
};

class Exception extends HttpException {
  isAxiosError?: boolean;
  codePrefix?: string;
  code?: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.error(exception);

    const error: ExceptionResponse = AllExceptionsFilter.getErrorData(exception);
    const ctx: HttpArgumentsHost = host.switchToHttp();

    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();

    const exceptionResponse: ExceptionResponse = {
      ...error,
      message: Array.isArray(error.message) ? error.message : [error.message],
    };

    AllExceptionsFilter.sentryCatch(exception, exceptionResponse, request);
    response.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json(exceptionResponse);
  }

  private static getErrorData(exception: Exception): ExceptionResponse {
    const exceptionResponse: ExceptionResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: exception.constructor.name,
      message: exception.message,
    };

    if (exception.codePrefix) {
      exceptionResponse.statusCode = AllExceptionsFilter.getFirebaseErrorCode(exception);
      exceptionResponse.message = exception.message;
      exceptionResponse.error = exception.code;

      return exceptionResponse;
    }

    if (exception.isAxiosError) {
      const { response } = exception as unknown as AxiosError;
      exceptionResponse.statusCode = response?.status;

      return exceptionResponse;
    }

    if (exception.hasOwnProperty('response')) {
      const httpException: string | object = exception.getResponse();

      if (isObject(httpException)) {
        return <ExceptionResponse>httpException;
      }

      exceptionResponse.message = httpException;
    }

    return exceptionResponse;
  }

  private static sentryCatch(error: Exception, context: ExceptionResponse, request: Request): void {
    const isErrorLogable =
      !(error.cause && error.cause.message === NOT_LOG_ERROR) && error.code !== 'auth/id-token-expired';

    if (isErrorLogable) {
      Sentry.withScope((scope: Sentry.Scope) => {
        scope.setExtra('application-error-details', {
          errorName: error.name,
          ...context,
          path: request?.url,
          method: request?.method,
          admin: request?.admin,
        });

        Sentry.captureException(error);
      });
    }
  }

  private static getFirebaseErrorCode(error: Exception): number {
    switch (error.code) {
      case 'auth/argument-error':
        return HttpStatus.UNAUTHORIZED;
      case 'auth/id-token-expired':
        return HttpStatus.UNAUTHORIZED;
      case 'auth/admin-not-found':
        return HttpStatus.NOT_FOUND;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
