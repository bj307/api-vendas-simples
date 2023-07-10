import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';
import { instanceToInstance } from 'class-transformer';

export default class SessionsController {
  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const newLogin = new CreateSessionsService();

    const user = await newLogin.execute({
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  }
}
