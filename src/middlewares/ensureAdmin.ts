import { NextFunction, Request, Response } from 'express';

// temporary implementation
export function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const isAdmin = true;

  const httpCode = 401;

  const message = 'Unauthorized';

  if (!isAdmin) {
    const error = {
      httpCode,
      message,
    };

    return response.status(httpCode).json({ error });
  }

  return next();
}
