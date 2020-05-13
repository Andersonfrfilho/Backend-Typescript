import { Response, Request } from 'express';
import { container } from 'tsyringe';
// SoC:Separation of Concerts (Separação de procupações)
// DTO - Data transfer object
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;
    console.log('veio aqui');
    const resetPassword = container.resolve(ResetPasswordService);
    console.log('chegou aqui');
    await resetPassword.execute({ token, password });
    return response.status(204).json();
  }
}
