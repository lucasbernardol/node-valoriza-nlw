import { Router } from 'express';

import { CreateComplimentsController } from '../controllers/CreateComplimentsController';
import { ListUsersReceiverComplimentsController } from '../controllers/ListUsersReceiverComplimentsController';
import { ListUsersSenderComplimentsController } from '../controllers/ListUsersSenderComplimentsController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const routes = Router();

const createComplimentsController = new CreateComplimentsController();

const listReceiceComplimentsController =
  new ListUsersReceiverComplimentsController();

const listSendComplimentsController =
  new ListUsersSenderComplimentsController();

routes.post(
  '/compliments',
  ensureAuthenticated(),
  createComplimentsController.handle
);

routes.get(
  '/compliments/receive',
  ensureAuthenticated(),
  listReceiceComplimentsController.handle
);

routes.get(
  '/compliments/send',
  ensureAuthenticated(),
  listSendComplimentsController.handle
);

export default routes;
