import { getCustomRepository } from 'typeorm';
import { CustumersRepository } from '../typeorm/repositories/CustumersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

export default class DeleteCustumerService {
  public async execute({ id }: IRequest): Promise<void> {
    const custumersRepository = getCustomRepository(CustumersRepository);

    const custumer = await custumersRepository.findById(id);

    if (!custumer) {
      throw new AppError('Cliente não encontrado.');
    }

    await custumersRepository.remove(custumer);
  }
}
