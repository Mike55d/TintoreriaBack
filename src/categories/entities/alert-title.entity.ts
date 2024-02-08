import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class AlertTitle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => Category, category => category.alertTitles, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE'
  })
  category: Category;
}
