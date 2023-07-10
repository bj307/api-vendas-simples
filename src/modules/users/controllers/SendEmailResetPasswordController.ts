import { Request, Response } from 'express';
import SendEmailResetPasswordUserService from '../services/SendEmailResetPasswordUserService';

export default class SendEmailResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendEmailReset = new SendEmailResetPasswordUserService();

    await sendEmailReset.execute({ email });

    return response.status(204).json();
  }
}
