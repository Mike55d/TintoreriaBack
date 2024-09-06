import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../../company/entities/company.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  country: string;

  @Column()
  postalCode: string;

  @Column()
  rfc: string;

  @ManyToMany(() => Company, { cascade: true })
  @JoinTable()
  companies: Company[];
}
