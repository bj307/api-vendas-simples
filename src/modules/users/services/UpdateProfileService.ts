import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  newPassword?: string;
  oldPassword?: string;
}

export default class UpdateProfileService {
  public async execute({
    userId,
    name,
    email,
    newPassword,
    oldPassword,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists && emailExists.id !== userId) {
      throw new AppError('Este email pertence a outra conta.');
    }

    if (newPassword && !oldPassword) {
      throw new AppError('Digite sua antiga senha.');
    }

    if (newPassword && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password);
      if (!checkOldPassword) {
        throw new AppError('Senha incorreta.', 401);
      }

      user.password = await hash(newPassword, 8);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}
