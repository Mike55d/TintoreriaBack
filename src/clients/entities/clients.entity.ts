import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  active: boolean;

  @Column({ length: 20, nullable: true })
  dni: string;

  @Column({ length: 100, nullable: true })
  name: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  contactName: string;

  @Column({ nullable: true })
  contactPhone: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ length: 100, nullable: true })
  trademark: string;

  @CreateDateColumn()
  regDate: Date;

  @UpdateDateColumn()
  lastUpdate: Date;

  get json() {
    return {
      id: this.id,
      dni: this.dni,
      name: this.name,
      active: this.active,
      country: this.country,
      phone: this.phone,
      address: this.address,
      email: this.email,
      contactName: this.contactName,
      contactPhone: this.contactPhone,
      notes: this.notes,
      trademark: this.trademark,
      regDate: this.regDate
    };
  }
}
