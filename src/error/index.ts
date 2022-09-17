import { AppError } from './app-error';
import { log } from './logger';

import {
  throwBadRequestError,
  throwInternalServerError,
  throwUnAuthenticatedError,
  throwUnAuthorizedError,
  throwNotFoundError,
} from './methods';

export {
  AppError,
  log,
  throwBadRequestError, // data required for req isn't present/enough
  throwInternalServerError,
  throwUnAuthenticatedError,
  throwUnAuthorizedError,
  throwNotFoundError,
};

// 3xx -> redirection
// 4xx -> client
// 5xx -> server

// XX -> fix all api to send proper error msgs and codes // Dones
// XX -> Middlewares also // Done
// M001 , M121 , M201 (MongoDB courses) -> Node JS ->   React -> GraphQL
//    use indexing in users
