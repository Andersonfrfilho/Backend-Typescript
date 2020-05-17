import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsControllers';
// SoC:Separation of Concerts (Separação de procupações)
// DTO - Data transfer object
const appointsmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointsmentsRouter.use(ensureAuthenticated);
appointsmentsRouter.post('/', appointmentsController.create);
appointsmentsRouter.get('/me', providerAppointmentsController.index);

export default appointsmentsRouter;
