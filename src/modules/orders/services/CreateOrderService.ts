import { getCustomRepository } from 'typeorm';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';
import AppError from '@shared/errors/AppError';
import Order from '../typeorm/entities/Order';
import { CustumersRepository } from '@modules/costumers/typeorm/repositories/CustumersRepository';
import { ProductsRepository } from '@modules/products/typeorm/repositories/ProductsRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  custumerId: string;
  products: IProduct[];
}

export default class CreateProductService {
  public async execute({ custumerId, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const custumersRepository = getCustomRepository(CustumersRepository);
    const productsRepository = getCustomRepository(ProductsRepository);

    const custumerExists = await custumersRepository.findById(custumerId);

    if (!custumerExists) {
      throw new AppError('Cliente não encontrado.');
    }

    const productsExists = await productsRepository.findAllByIds(products);

    if (!productsExists.length) {
      throw new AppError('Nenhum produto encontrado.');
    }

    const allProducts = productsExists.map(product => product.id);

    const productsInexistent = products.filter(
      product => !allProducts.includes(product.id),
    );

    if (productsInexistent.length) {
      throw new AppError(
        `Alguns produtos não foram encontrados ${productsInexistent[0].id}`,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        productsExists.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `Alguns produtos não possuem estoque suficiente. Product ID: ${quantityAvailable[0].id}.`,
      );
    }

    const serializedProducts = products.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      price: productsExists.filter(p => p.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      custumer: custumerExists,
      products: serializedProducts,
    });

    const { orderProducts } = order;

    const updateProductQuantity = orderProducts.map(product => ({
      id: product.productId,
      quantity:
        productsExists.filter(p => p.id === product.productId)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updateProductQuantity);

    await ordersRepository.save(order);

    return order;
  }
}
