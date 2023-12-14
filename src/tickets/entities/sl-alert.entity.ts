import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Ticket } from './ticket.entity';

@Entity()
export class SlAlert {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ticket)
  ticket: Ticket;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  regDate: Date;
}
