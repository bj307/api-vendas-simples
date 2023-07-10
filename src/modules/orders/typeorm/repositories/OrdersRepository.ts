import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';
import Custumer from '@modules/costumers/typeorm/entities/Custumer';

interface IProduct {
  productId: string;
  price: number;
  quantity: number;
}

interface IRequest {
  custumer: Custumer;
  products: IProduct[];
}

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    const order = this.findOne(id, {
      relations: ['orderProducts', 'custumer'],
    });

    return order;
  }

  public async createOrder({ custumer, products }: IRequest): Promise<Order> {
    const order = this.create({
      custumer,
      orderProducts: products,
    });

    await this.save(order);

    return order;
  }
}
