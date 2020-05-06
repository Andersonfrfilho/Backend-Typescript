import { Response, Request } from 'express';
import { container } from 'tsyringe';
// SoC:Separation of Concerts (Separação de procupações)
// DTO - Data transfer object
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateUserService);
    const { user, token } = await authenticateUser.execute({ email, password });
    delete user.password;
    return response.send({ user, token });
  }
}
