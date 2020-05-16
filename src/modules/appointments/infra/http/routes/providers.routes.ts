import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
// SoC:Separation of Concerts (Separação de procupações)
// DTO - Data transfer object
const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAuthenticated);
providersRouter.get('/', providersController.index);

export default providersRouter;
