import { Router } from 'express';

import { AuthenticateUsersController } from '../controllers/AuthenticateUsersController';

const routes = Router();

const authenticateUsersController = new AuthenticateUsersController();

routes.post('/sessions', authenticateUsersController.handle);

export default routes;
