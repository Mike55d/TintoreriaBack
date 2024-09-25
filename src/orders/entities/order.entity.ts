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
import { History } from './history.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  status: number;

  @Column()
  payType: number;

  @Column({ nullable: true })
  endDate: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Currency)
  currency: Currency;

  @OneToMany(() => GarmentsOrder, garmentsOrder => garmentsOrder.order, {
    cascade: true
  })
  garments: GarmentsOrder[];

  @Column()
  total: number;

  @OneToMany(() => History, history => history.order, {
    cascade: true
  })
  historyEntries: History[];

  get json() {
    return {
      id: this.id,
      status: this.status,
      created_at: this.created_at,
      currencyId: this.currency.id,
      garments: this.garments,
      total: this.total,
      endDate: this.endDate,
      payType: this.payType,
      historyEntries: this.historyEntries
    };
  }
}
