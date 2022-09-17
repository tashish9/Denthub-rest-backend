import { config } from 'dotenv';

const dotEnv = config();
const { PORT, MONGO_URI, SECRET, ENV, COMMON_PASSWORD } = process.env;

const CONSTANTS = {
  PORT,
  ENV,
  MONGO_URI: MONGO_URI || 'mongodb://localhost:27017/denthub-local',
  SECRET,
  COMMON_PASSWORD,
  ENVIRONMENTS: {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
  },
  LOG_LEVELS: {
    INFO: 'info',
    ERROR: 'error',
    DEBUG: 'debug',
  },
  ERROR: {
    BAD_REQUEST: {
      TYPE: 'BAD_REQUEST',
      CODE: 400,
    },
    NOT_FOUND: {
      TYPE: 'NOT_FOUND',
      CODE: 404,
    },
    INTERNAL_SERVER_ERROR: {
      TYPE: 'INTERNAL_SERVER_ERROR',
      CODE: 500,
    },
    UNAUTHORIZED: {
      TYPE: 'UNAUTHORIZED',
      CODE: 403,
    },
    UNAUTHENTICATED: {
      TYPE: 'UNAUTHENTICATED',
      CODE: 401,
    },
  },
};
export { CONSTANTS };
