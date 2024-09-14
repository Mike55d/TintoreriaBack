import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Price } from '../../prices/entities/price.entity';

@Entity()
export class Garment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Price, Price => Price.garment, { cascade: true })
  prices: Price[];
  
}
