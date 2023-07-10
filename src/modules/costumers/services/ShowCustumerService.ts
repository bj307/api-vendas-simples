import { getCustomRepository } from 'typeorm';
import { CustumersRepository } from '../typeorm/repositories/CustumersRepository';
import Custumer from '../typeorm/entities/Custumer';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

export default class ShowCustumerService {
  public async execute({ id }: IRequest): Promise<Custumer> {
    const custumersRepository = getCustomRepository(CustumersRepository);

    const custumer = await custumersRepository.findById(id);

    if (!custumer) {
      throw new AppError('Cliente não encontrado.');
    }

    return custumer;
  }
}
