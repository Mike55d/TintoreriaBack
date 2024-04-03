import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AlertTitle } from '../../categories/entities/alert-title.entity';

@Entity()
export class NotifcationsTitleAlert {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(() => AlertTitle)
  alertTitle: AlertTitle;

  @Column({ type: 'simple-array' })
  emails: string[];
}
