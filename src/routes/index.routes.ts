import { Router } from 'express';

import { MainController } from '../controllers/MainController';

const routes = Router();

const controller = new MainController();

routes.get('/', controller.main);

export default routes;
