import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Currency } from '../../currencies/entities/currency.entity';

@Entity()
export class GeneralPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  generalPrice: number;

  @Column({ nullable: true })
  ironingDiscount: number;

  @ManyToOne(() => Currency)
  currency: Currency;
}
