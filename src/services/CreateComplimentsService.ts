import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';

import { UsersRepositories } from '../repositories/UsersRepositories';

interface Compliment {
  message: string;
  senderId: string;
  receiverId: string;
  tagId: string;
}

export class CreateComplimentsService {
  /**
   * @description Create compliments.
   */
  public async execute(data: Compliment) {
    const { message, senderId, receiverId, tagId } = data;

    const isDuplicateIds = senderId === receiverId;

    if (isDuplicateIds) {
      throw new Error('Duplicate ids');
    }

    const usersRpositories = getCustomRepository(UsersRepositories);

    const userReceiver = await usersRpositories.findOne(receiverId);

    if (!userReceiver) {
      throw new Error('Invalid receiverId');
    }

    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );

    const complimentInstance = complimentsRepositories.create({
      message,
      senderId,
      receiverId,
      tagId,
    });

    const compliment = await complimentsRepositories.save(complimentInstance);

    return compliment;
  }
}
