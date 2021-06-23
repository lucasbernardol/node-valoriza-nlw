import { Router } from 'express';

import { CreateTagsController } from '../controllers/CreateTagsController';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const routes = Router();

const createTagsController = new CreateTagsController();

routes.post('/tags', ensureAdmin, createTagsController.handle);

export default routes;
