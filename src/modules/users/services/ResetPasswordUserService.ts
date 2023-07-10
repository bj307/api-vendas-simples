import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';
import { addHours, isAfter } from 'date-fns';

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordUserService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);
    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token inexistente.');
    }

    const user = await usersRepository.findById(userToken.userId);

    if (!user) {
      throw new AppError('Usuário não existe.');
    }

    const compareDate = addHours(userToken.created_at, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado.');
    }

    user.password = await hash(password, 8);

    await usersRepository.save(user);
  }
}
