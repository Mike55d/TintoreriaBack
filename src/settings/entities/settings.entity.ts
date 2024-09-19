import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Currency } from '../../currencies/entities/currency.entity';

@Entity()
export class Settings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ironing_discount: number;

  @Column()
  general_price: number;

  @ManyToOne(() => Currency)
  currency: Currency;

  get json() {
    return {
      id: this.id,
      currencyId: this.currency?.id
    };
  }
}
