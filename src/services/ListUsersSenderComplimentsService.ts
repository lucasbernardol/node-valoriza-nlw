import { classToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';

interface Sender {
  senderId: string;
}

export class ListUsersSenderComplimentsService {
  public async execute(sender: Sender) {
    const { senderId } = sender;

    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );

    const [result, total] = await complimentsRepositories.findAndCount({
      where: {
        senderId,
      },
      relations: ['receiver', 'tag'],
    });

    const compliments = result.map((data) => {
      const receiver = classToPlain(data.receiver);

      const tag = classToPlain(data.tag);

      return { ...data, receiver, tag };
    });

    return {
      compliments,
      total,
    };
  }
}
