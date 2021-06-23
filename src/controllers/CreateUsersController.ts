import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUsersService';

export class CreateUsersController {
  async create(request: Request, response: Response) {
    const { name, email, password, isAdmin } = request.body;

    const createUserService = new CreateUserService();

    const created = await createUserService.create({
      name,
      email,
      password,
      isAdmin,
    });

    return response.json(created);
  }
}
