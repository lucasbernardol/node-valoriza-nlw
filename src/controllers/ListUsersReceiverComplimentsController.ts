import { Request, Response } from 'express';
import { ListUsersReceiverComplimentsService } from '../services/ListUsersReceiverComplimentsService';

export class ListUsersReceiverComplimentsController {
  public async handle(request: Request, response: Response) {
    const { userId } = request;

    const listReceiveComplemints = new ListUsersReceiverComplimentsService();

    const compliments = await listReceiveComplemints.execute({
      receiverId: userId,
    });

    return response.json(compliments);
  }
}
