import { getCustomRepository } from 'typeorm';
import { classToPlain } from 'class-transformer';

import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';

interface Receiver {
  receiverId: string;
}

export class ListUsersReceiverComplimentsService {
  public async execute(receiver: Receiver) {
    const { receiverId } = receiver;

    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );

    const [result, total] = await complimentsRepositories.findAndCount({
      where: {
        receiverId,
      },
      relations: ['sender', 'tag'],
    });

    const compliments = result.map((compliment) => {
      const sender = classToPlain(compliment.sender);

      const tag = classToPlain(compliment.tag);

      return { ...compliment, sender, tag };
    });

    return {
      compliments,
      total,
    };
  }
}
