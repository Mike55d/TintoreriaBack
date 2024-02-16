import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity({ name: 'historic' })
export class Historic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('longtext')
  content: string;

  @ManyToOne(() => Ticket)
  ticket?: Ticket;

  @CreateDateColumn({ name: 'reg_date' })
  regDate: Date;

  @ManyToOne(() => User, { nullable: true })
  user?: User;

  @Column({ default: 0 })
  type: number;

  @Column({ default: false, nullable: true })
  includeIcs: boolean;
}
