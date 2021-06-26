import { Request, Response } from 'express';
import { ListTagsService } from '../services/ListTagsService';

export class ListTagsController {
  public async handle(request: Request, response: Response) {
    const listTags = new ListTagsService();

    const tags = await listTags.execute();

    return response.json(tags);
  }
}
