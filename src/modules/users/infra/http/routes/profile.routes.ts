import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';
// SoC:Separation of Concerts (Separação de procupações)
// DTO - Data transfer object
const profileRouter = Router();
const profileController = new ProfileController();
profileRouter.use(ensureAuthenticated);
profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
