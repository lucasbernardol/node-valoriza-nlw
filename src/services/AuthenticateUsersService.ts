import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt';

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

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const { secret, expiresIn } = jwtConfig;

    const token = jwt.sign({ email: user.email }, secret, {
      subject: user.id,
      expiresIn,
    });

    delete user.password;

    return {
      token,
      user,
    };
  }
}
