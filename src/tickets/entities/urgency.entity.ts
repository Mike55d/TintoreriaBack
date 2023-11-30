import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Urgency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
}
