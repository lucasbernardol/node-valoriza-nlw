import { Router } from 'express';

import { CreateTagsController } from '../controllers/CreateTagsController';
import { DeleteTagsController } from '../controllers/DeleteTagsController';
import { ListTagsController } from '../controllers/ListTagsController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const routes = Router();

const createTagsController = new CreateTagsController();

const listTagsController = new ListTagsController();

const deleteTagsController = new DeleteTagsController();

routes.get('/tags', ensureAuthenticated(), listTagsController.handle);

routes.post(
  '/tags',
  ensureAuthenticated(),
  ensureAdmin(),
  createTagsController.handle
);

routes.delete(
  '/tags/:id',
  ensureAuthenticated(),
  ensureAdmin(),
  deleteTagsController.handle
);

export default routes;
