import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { configurationModuleOptions } from './common/configs';
import { ContactModule } from './api/contact/contact.module';
import { AllExceptionsFilter } from './common/filters';
import { DatabaseModule } from './database';

@Module({
  imports: [ConfigModule.forRoot(configurationModuleOptions), DatabaseModule, ContactModule],
  exports: [ConfigModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  controllers: [],
})
export class AppModule {}
