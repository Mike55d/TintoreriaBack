import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
