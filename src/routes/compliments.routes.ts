import { Router } from 'express';

import { CreateComplimentsController } from '../controllers/CreateComplimentsController';

const routes = Router();

const createComplimentsController = new CreateComplimentsController();

routes.post('/compliments', createComplimentsController.handle);

export default routes;
