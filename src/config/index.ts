import { cleanEnv, port, str, bool } from 'envalid';
import { config } from 'dotenv';

export enum NodeEnv {
  DEV = 'development',
  PROD = 'production',
  STAGE = 'staging',
  TEST = 'test',
}

config({ path: `.env.${process.env.NODE_ENV || NodeEnv.DEV}.local` });

export const $env = cleanEnv(
  {
    ...process.env,
    isStage: NodeEnv.STAGE === process.env.NODE_ENV,
  },
  {
    isStage: bool(),

    PORT: port({ default: 3000 }),
    NODE_ENV: str({ default: NodeEnv.DEV, choices: Object.values(NodeEnv) }),
    API_URL: str({ default: 'http://localhost:3000/api' }),

    DB_CONNECTION_STRING: str(),
    DB_DATABASE: str(),

    LOG_FORMAT: str(),
    LOG_DIR: str(),
    SWAGGER_DIR: str(),

    CORS_ORIGIN: str(),
    CORS_CREDENTIALS: bool({ default: true }),
  },
);
