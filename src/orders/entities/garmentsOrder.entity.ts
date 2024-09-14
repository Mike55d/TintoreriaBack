import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Garment } from '../../garments/entities/garment.entity';
import { Order } from './order.entity';

@Entity()
export class GarmentsOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  ironingOnly: boolean;

  @ManyToOne(() => Garment)
  garment: Garment;

  @ManyToOne(() => Order, order => order.garments, { orphanedRowAction: 'delete' })
  order: Order;
}
