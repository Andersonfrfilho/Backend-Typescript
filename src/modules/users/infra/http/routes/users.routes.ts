import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import UsersAvatarController from '../controllers/UserAvatarController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
// SoC:Separation of Concerts (Separação de procupações)
// DTO - Data transfer object
const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UsersAvatarController();
const upload = multer(uploadConfig);
usersRouter.post('/', usersController.create);
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);
export default usersRouter;
