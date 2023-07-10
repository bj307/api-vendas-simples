import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Custumer from '@modules/costumers/typeorm/entities/Custumer';
import OrdersProducts from './OrdersProducts';

@Entity('orders')
export default class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Custumer)
  @JoinColumn({ name: 'custumerId' })
  custumer: Custumer;

  @OneToMany(() => OrdersProducts, orderProducts => orderProducts.order, {
    cascade: true,
  })
  orderProducts: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
