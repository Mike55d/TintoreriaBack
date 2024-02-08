import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AlertTitle } from './alert-title.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @OneToMany(() => AlertTitle, alertTitles => alertTitles.category, { cascade: true })
  alertTitles: AlertTitle[];

  @OneToMany(() => Ticket, tickets => tickets.category, { cascade: true })
  tickets: Ticket[];
}
