import { Router } from 'express';

import { CreateComplimentsController } from '../controllers/CreateComplimentsController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const routes = Router();

const createComplimentsController = new CreateComplimentsController();

routes.post(
  '/compliments',
  ensureAuthenticated(),
  createComplimentsController.handle
);

export default routes;
