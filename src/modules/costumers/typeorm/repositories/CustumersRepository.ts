import { EntityRepository, Repository } from 'typeorm';
import Custumer from '../entities/Custumer';

@EntityRepository(Custumer)
export class CustumersRepository extends Repository<Custumer> {
  public async findByName(name: string): Promise<Custumer | undefined> {
    const custumer = this.findOne({
      where: {
        name,
      },
    });

    return custumer;
  }

  public async findById(id: string): Promise<Custumer | undefined> {
    const custumer = this.findOne(id);

    return custumer;
  }

  public async findByEmail(email: string): Promise<Custumer | undefined> {
    const custumer = this.findOne({
      where: {
        email,
      },
    });

    return custumer;
  }
}
