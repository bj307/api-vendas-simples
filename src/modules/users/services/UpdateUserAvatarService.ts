import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import upload from '@config/upload';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import FirebaseStorageProvider from '@shared/providers/StorageProvider/FirebaseStorageProvider';
import { Request } from 'express';

interface IRequest {
  userId: string;
  avatarFile: string;
  request: Request;
}

export default class UpdateUserAvatarService {
  public async execute({
    userId,
    avatarFile,
    request,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    if (process.env.STORAGE_DRIVER === 'firebase') {
      const s3Provider = new FirebaseStorageProvider();

      if (user.avatar) {
        await s3Provider.deleteFile(user.avatar);
      }

      const filename = await s3Provider.saveFile(request);
      user.avatar = filename;
    } else {
      const diskProvider = new DiskStorageProvider();
      if (user.avatar) {
        await diskProvider.deleteFile(user.avatar);
      }

      const filename = await diskProvider.saveFile(avatarFile);
      user.avatar = filename;
    }

    await usersRepository.save(user);

    return user;
  }
}
