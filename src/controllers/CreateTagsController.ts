import { Request, Response } from 'express';
import { CreateTagService } from '../services/CreateTagsService';

export class CreateTagsController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const createTagsService = new CreateTagService();

    const createdTag = await createTagsService.execute({
      name,
    });

    return response.status(201).json(createdTag);
  }
}
