import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Currency } from '../../currencies/entities/currency.entity';
import { Garment } from '../../garments/entities/garment.entity';

@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  type: number;

  @Column({ nullable: true })
  price: number;

  @ManyToOne(() => Currency)
  currency: Currency;

  @ManyToOne(() => Garment, garment => garment.prices)
  garment: Garment;
}
