import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ConfigVariables, ENV_LIST } from '../common/constants';
import { Contact } from '../api/contact/entities';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        let config: TypeOrmModuleOptions = {
          database: configService.get<string>(ConfigVariables.DB_NAME),
          username: configService.get<string>(ConfigVariables.DB_USERNAME),
          password: configService.get<string>(ConfigVariables.DB_PASSWORD),
          host: configService.get<string>(ConfigVariables.DB_HOST),
          port: configService.get<number>(ConfigVariables.DB_PORT),
          type: ConfigVariables.DB_TYPE,
          migrationsRun: false,
          synchronize: false,
          entities: [Contact],
        };

        if (configService.get<string>(ConfigVariables.ENV) === ENV_LIST.DEVELOPMENT) {
          // config = { ...config, ssl: { rejectUnauthorized: false } };
          config = { ...config, ssl: false };
        }

        return config;
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
