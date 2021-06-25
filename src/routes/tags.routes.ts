import { Router } from 'express';

import { CreateTagsController } from '../controllers/CreateTagsController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const routes = Router();

const createTagsController = new CreateTagsController();

routes.post(
  '/tags',
  ensureAuthenticated(),
  ensureAdmin(),
  createTagsController.handle
);

export default routes;
