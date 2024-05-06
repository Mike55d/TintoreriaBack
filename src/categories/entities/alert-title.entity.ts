import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { DistributionList } from '../../distribution-lists/entities/distributionList.entity';

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

  @OneToMany(() => DistributionList, distributionLists => distributionLists.alertTitle)
  distributionLists: DistributionList[];
}
