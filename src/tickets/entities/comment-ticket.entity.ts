import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Ticket } from './ticket.entity';

@Entity()
export class CommentTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user?: User;

  @Column({ type: 'text' })
  comment: string;

  @ManyToOne(() => Ticket, ticket => ticket.comments)
  ticket?: Ticket;

  @CreateDateColumn()
  created_at: Date;
}
