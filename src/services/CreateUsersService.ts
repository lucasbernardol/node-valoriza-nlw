import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';
import bcrypt from 'bcrypt';

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
      throw new Error('Unauthorized, invalid email address');
    }

    const hash = await bcrypt.hash(password, 10);

    const userInstance = usersRepository.create({
      name,
      email,
      password: hash,
      isAdmin,
    });

    const created = await usersRepository.save(userInstance);

    return created;
  }
}
