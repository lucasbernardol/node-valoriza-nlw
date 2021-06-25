import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { UsersRepositories } from '../repositories/UsersRepositories';

export function ensureAdmin() {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { userId } = request;

    const usersRepositories = getCustomRepository(UsersRepositories);

    const { isAdmin } = await usersRepositories.findOne(userId);

    if (!isAdmin) {
      return response.sendStatus(401);
    }

    return next();
  };
}
