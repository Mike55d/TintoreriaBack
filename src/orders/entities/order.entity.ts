import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Currency } from '../../currencies/entities/currency.entity';
import { GarmentsOrder } from './garmentsOrder.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Currency)
  currency: Currency;

  @OneToMany(() => GarmentsOrder, garmentsOrder => garmentsOrder.order, { cascade: true })
  garments: GarmentsOrder[];

  get json() {
    return {
      id: this.id,
      status: this.status,
      created_at: this.created_at,
      currencyId: this.currency.id,
      garments: this.garments
    };
  }
}
