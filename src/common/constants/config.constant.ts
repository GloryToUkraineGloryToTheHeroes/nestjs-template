export const ENV_FILE_PATH = '.env';

export enum ENV_LIST {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
}

export const VALIDATION_PIPE_OPTIONS = { transform: true, whitelist: true };

export enum ConfigVariables {
  FIREBASE_PROJECT_ID = 'firebase_project_id',
  FIREBASE_PRIVATE_KEY = 'firebase_private_key',
  FIREBASE_CLIENT_EMAIL = 'firebase_client_email',
  FIREBASE_API_KEY = 'firebase_api_key',

  SENTRY_DNS = 'sentry_dns',
  ENV = 'env',
  PORT = 'port',
  DB_HOST = 'db_host',
  DB_PORT = 'db_port',
  DB_NAME = 'db_name',
  DB_USERNAME = 'db_username',
  DB_PASSWORD = 'db_password',
  DB_TYPE = 'postgres',
}
