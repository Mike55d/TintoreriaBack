import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: number;

  @ManyToOne(() => Order, order => order.historyEntries, {
    onDelete: 'CASCADE'
  })
  order: Order;
}
