import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Currency } from '../../currencies/entities/currency.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  personName: string;

  @Column()
  personEmail: string;

  @Column()
  country: string;

  @ManyToOne(() => Currency, { nullable: true })
  currency: Currency;

  get json() {
    return {
      id: this.id,
      name: this.name,
      brand: this.brand,
      address: this.address,
      email: this.email,
      personName: this.personName,
      personEmail: this.personEmail,
      country: this.country,
      currencyId: this.currency.id
    };
  }
}
