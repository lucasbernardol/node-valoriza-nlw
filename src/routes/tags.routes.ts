import { Router } from 'express';
import { CreateTagsController } from '../controllers/CreateTagsController';

const routes = Router();

const createTagsController = new CreateTagsController();

routes.post('/tags', createTagsController.handle);

export default routes;
