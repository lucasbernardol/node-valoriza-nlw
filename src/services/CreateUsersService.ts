import { getCustomRepository } from 'typeorm';
import { classToPlain } from 'class-transformer';

import { UsersRepositories } from '../repositories/UsersRepositories';

type User = {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
};

export class CreateUserService {
  async create({ name, email, password, isAdmin }: User) {
    const usersRepository = getCustomRepository(UsersRepositories);

    const userExists = await usersRepository.findOne({ email });

    if (userExists) {
      throw new Error('Invalid email address');
    }

    const userInstance = usersRepository.create({
      name,
      email,
      password,
      isAdmin,
    });

    const created = await usersRepository.save(userInstance);

    return classToPlain(created);
  }
}
