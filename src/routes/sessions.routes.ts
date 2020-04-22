import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
// SoC:Separation of Concerts (Separação de procupações)
// DTO - Data transfer object
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({ email, password });
  delete user.password;
  return response.send({ user, token });
});

export default sessionsRouter;
