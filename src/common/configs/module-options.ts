import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

import { ENV_FILE_PATH, ENV_LIST } from '../constants';
import { envConfiguration } from './configurations';

export const configurationModuleOptions: ConfigModuleOptions = {
  envFilePath: ENV_FILE_PATH,
  load: [envConfiguration],
  validationSchema: Joi.object({
    FIREBASE_CLIENT_EMAIL: Joi.string().required(),
    FIREBASE_PRIVATE_KEY: Joi.string().required(),
    FIREBASE_PROJECT_ID: Joi.string().required(),
    FIREBASE_API_KEY: Joi.string().required(),
    SENTRY_DNS: Joi.string().required(),
    PORT: Joi.number().required(),
    ENV: Joi.string()
      .valid(...Object.values(ENV_LIST))
      .required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
  }),
};
