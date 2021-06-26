import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';

import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt';
import { classToPlain } from 'class-transformer';

type Authenticate = {
  email: string;
  password: string;
};

export class AuhtenticateUsersService {
  async execute(authenticate: Authenticate) {
    const { email, password } = authenticate;

    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({ email });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = user.compare(password);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const { secret, expiresIn } = jwtConfig;

    const token = jwt.sign({ email: user.email }, secret, {
      subject: user.id,
      expiresIn,
    });

    const account = classToPlain(user);

    return {
      token,
      account,
    };
  }
}
