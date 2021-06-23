import { Request, Response } from 'express';

export class MainController {
  /**
   * @description Default path '/'
   */
  public main(request: Request, response: Response) {
    const info = {
      api: {
        version: process.env.VERSION || '1.0.0',
        author: process.env.AUTHOR,
      },
    };

    return response.json(info);
  }
}
