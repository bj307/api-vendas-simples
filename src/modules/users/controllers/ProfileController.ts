import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';
import { instanceToInstance } from 'class-transformer';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfileService();
    const userId = request.user.id;

    const user = await showProfile.execute({ userId });

    return response.json(instanceToInstance(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { name, email, newPassword, oldPassword } = request.body;

    const updateUser = new UpdateProfileService();

    const user = await updateUser.execute({
      userId,
      name,
      email,
      newPassword,
      oldPassword,
    });

    return response.json(instanceToInstance(user));
  }
}
