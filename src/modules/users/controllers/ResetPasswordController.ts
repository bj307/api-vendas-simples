import { Request, Response } from 'express';
import ResetPasswordUserService from '../services/ResetPasswordUserService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPassword = new ResetPasswordUserService();

    await resetPassword.execute({ token, password });

    return response.status(204).json();
  }
}
