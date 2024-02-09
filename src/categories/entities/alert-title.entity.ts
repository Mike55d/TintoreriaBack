import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity()
export class AlertTitle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => Category, category => category.alertTitles)
  category: Category;

  @ManyToOne(() => Ticket, ticket => ticket.alertTitle)
  tickets: Ticket;
}
