import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import { instanceToInstance } from 'class-transformer';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = await updateAvatar.execute({
      userId: request.user.id,
      avatarFile: request.file?.filename as string,
      request,
    });

    return response.json(instanceToInstance(user));
  }
}
