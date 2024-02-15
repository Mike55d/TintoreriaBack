import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity()
export class FileE {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;
}
