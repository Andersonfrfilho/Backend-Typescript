import { Response, Request } from 'express';
import { container } from 'tsyringe';
// SoC:Separation of Concerts (Separação de procupações)
// DTO - Data transfer object
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({
      name,
      email,
      password,
    });
    return response.send(classToClass(user));
  }
}
