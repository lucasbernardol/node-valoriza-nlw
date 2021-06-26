import { Request, Response } from 'express';

import { ListUsersSenderComplimentsService } from '../services/ListUsersSenderComplimentsService';

export class ListUsersSenderComplimentsController {
  public async handle(request: Request, response: Response) {
    const { userId } = request;

    const listSendComplemints = new ListUsersSenderComplimentsService();

    const compliments = await listSendComplemints.execute({
      senderId: userId,
    });

    return response.json(compliments);
  }
}
