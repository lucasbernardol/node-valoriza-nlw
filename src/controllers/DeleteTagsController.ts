import { Request, Response } from 'express';
import { DeleteTagsService } from '../services/DeleteTagsService';

export class DeleteTagsController {
  public async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteTags = new DeleteTagsService();

    const { affected } = await deleteTags.execute(id);

    return response.json({ affected });
  }
}
