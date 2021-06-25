import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';

import config from '../config/jwt';

type Payload = {
  exp: number;
  iat: number;
  sub: string;
  email: string;
};

export function ensureAuthenticated() {
  return (request: Request, response: Response, next: NextFunction) => {
    const unauthorized = 401;

    /**
     * Available headers
     */
    const headers = ['authorization', 'x-auth-header', 'x-token'];

    const authorization = headers.reduce((accumulator, value) => {
      const hasProperty = value in request.headers;

      accumulator = hasProperty ? request.get(value) : accumulator;

      return accumulator;
    }, '');

    if (!authorization) {
      return response.sendStatus(unauthorized);
    }

    /**
     * Regular expression to select whitespaces
     */
    const whitespaces = /\s/;

    const splitted = authorization.split(whitespaces);

    const [, token] = splitted;

    const { secret } = config;

    try {
      const { sub } = jwt.verify(token, secret) as Payload;

      request.userId = sub;
    } catch (error) {
      return response.sendStatus(unauthorized);
    }

    return next();
  };
}
