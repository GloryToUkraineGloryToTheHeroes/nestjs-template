import { ConfigObject } from '@nestjs/config';
import * as process from 'process';

export const envConfiguration = (): ConfigObject => ({
  firebase_project_id: process.env.FIREBASE_PROJECT_ID,
  firebase_private_key: process.env.FIREBASE_PRIVATE_KEY,
  firebase_client_email: process.env.FIREBASE_CLIENT_EMAIL,
  firebase_api_key: process.env.FIREBASE_API_KEY,

  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  db_name: process.env.DB_NAME,
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,

  sentry_dns: process.env.SENTRY_DNS,
  port: process.env.PORT,
  env: process.env.ENV,
});
