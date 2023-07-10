import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';

interface IRequest {
  email: string;
}

export default class SendEmailResetPasswordUserService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);
    const userExists = await usersRepository.findByEmail(email);

    if (!userExists) {
      throw new AppError('Usuário não cadastrado.');
    }

    const token = await userTokensRepository.generate(userExists.id);

    const emailResetTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'resetPassword.hbs',
    );

    await EtherealMail.sendEmail({
      to: {
        name: userExists.name,
        email: userExists.email,
      },
      subject: '[API Vendas] Recuperação de Senha.',
      templateData: {
        file: emailResetTemplate,
        variables: {
          name: userExists.name,
          email: userExists.email,
          link: `${process.env.APP_WEB_URL}/reset?token=${token.token}`,
        },
      },
    });
  }
}
