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
import { Client } from '../../clients/entities/client.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  status: number;

  @Column({ default: 0 })
  payType: number;

  @Column({ nullable: true })
  endDate: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Currency)
  currency: Currency;

  @ManyToOne(() => Client, { nullable: true })
  client: Client;

  @OneToMany(() => GarmentsOrder, garmentsOrder => garmentsOrder.order, {
    cascade: true
  })
  garments: GarmentsOrder[];

  @Column({ nullable: true })
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
      currency: this.currency,
      client: this.client,
      garments: this.garments,
      total: this.total,
      endDate: this.endDate,
      payType: this.payType,
      historyEntries: this.historyEntries
    };
  }
}
