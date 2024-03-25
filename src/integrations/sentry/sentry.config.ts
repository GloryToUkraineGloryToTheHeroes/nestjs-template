import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import * as Sentry from '@sentry/node';

import { ConfigVariables } from '../../common/constants';

@Injectable()
export class SentryConfig {
  constructor(private readonly configService: ConfigService) {}

  initConnection() {
    Sentry.init({
      environment: this.configService.get<string>(ConfigVariables.ENV),
      dsn: this.configService.get<string>(ConfigVariables.SENTRY_DNS),
      debug: true,
    });
  }
}
