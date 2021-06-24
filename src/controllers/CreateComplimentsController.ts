import { Request, Response } from 'express';

import { CreateComplimentsService } from '../services/CreateComplimentsService';

export class CreateComplimentsController {
  public async handle(request: Request, response: Response) {
    const { senderId, receiverId, tagId, message } = request.body;

    const createCompliments = new CreateComplimentsService();

    const compliment = await createCompliments.execute({
      senderId,
      receiverId,
      tagId,
      message,
    });

    return response.json(compliment);
  }
}
