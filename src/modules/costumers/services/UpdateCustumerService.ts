import { getCustomRepository } from 'typeorm';
import { CustumersRepository } from '../typeorm/repositories/CustumersRepository';
import Custumer from '../typeorm/entities/Custumer';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export default class UpdateCustumerService {
  public async execute({ id, name, email }: IRequest): Promise<Custumer> {
    const custumersRepository = getCustomRepository(CustumersRepository);

    const custumer = await custumersRepository.findById(id);

    if (!custumer) {
      throw new AppError('Cliente não encontrado.');
    }

    const emailExists = await custumersRepository.findByEmail(email);

    if (emailExists && emailExists.id !== id) {
      throw new AppError('Este email pertence a outra conta.');
    }

    custumer.name = name;
    custumer.email = email;

    await custumersRepository.save(custumer);

    return custumer;
  }
}
