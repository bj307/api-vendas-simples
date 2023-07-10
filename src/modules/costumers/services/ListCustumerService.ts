import { getCustomRepository } from 'typeorm';
import { CustumersRepository } from '../typeorm/repositories/CustumersRepository';
import Custumer from '../typeorm/entities/Custumer';

interface IPaginateCustumer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Custumer[];
}

export default class ListCustumerService {
  public async execute(): Promise<IPaginateCustumer> {
    const custumersRepository = getCustomRepository(CustumersRepository);

    const custumers = await custumersRepository.createQueryBuilder().paginate();

    return custumers as IPaginateCustumer;
  }
}
