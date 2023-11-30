import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class AssignUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user?: User;

  @Column({ nullable: true })
  email?: string;
}
