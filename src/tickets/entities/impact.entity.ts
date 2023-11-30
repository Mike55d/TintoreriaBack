import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Impact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
}
