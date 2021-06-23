import { Router } from 'express';

import { CreateUsersController } from '../controllers/CreateUsersController';

const routes = Router();

const createUsersController = new CreateUsersController();

routes.post('/users', createUsersController.create);

export default routes;
