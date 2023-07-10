import { getCustomRepository } from 'typeorm';
import { CustumersRepository } from '../typeorm/repositories/CustumersRepository';
import AppError from '@shared/errors/AppError';
import Custumer from '../typeorm/entities/Custumer';

interface IRequest {
  name: string;
  email: string;
}

export default class CreateCustumerService {
  public async execute({ name, email }: IRequest): Promise<Custumer> {
    const custumersRepository = getCustomRepository(CustumersRepository);
    const emailExists = await custumersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email já cadastrado.');
    }

    const custumer = custumersRepository.create({
      name,
      email,
    });

    await custumersRepository.save(custumer);

    return custumer;
  }
}
