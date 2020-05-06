import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
// SoC:Separation of Concerts (Separação de procupações)
// DTO - Data transfer object
const appointsmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointsmentsRouter.use(ensureAuthenticated);
appointsmentsRouter.post('/', appointmentsController.create);

export default appointsmentsRouter;
