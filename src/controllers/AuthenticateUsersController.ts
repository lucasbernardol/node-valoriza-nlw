import { Request, Response } from 'express';
import { AuhtenticateUsersService } from '../services/AuthenticateUsersService';

export class AuthenticateUsersController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticationService = new AuhtenticateUsersService();

    const { token, account } = await authenticationService.execute({
      email,
      password,
    });

    return response.json({ token, account });
  }
}
