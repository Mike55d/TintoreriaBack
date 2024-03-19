import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'glpi_tickets' })
export class TicketGlpi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default:0, nullable:true})
  entitiesId: number;  

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  date: Date;

  @Column({ nullable: true })
  closedate: Date;

  @Column({ nullable: true })
  solvedate: Date;

  @Column({ nullable: true })
  status: number;

  @Column('longtext')
  content?: string;

  @Column({ nullable: true })
  urgency: number;

  @Column({ nullable: true })
  impact: number;

  @Column({ nullable: true })
  priority: number;

  @Column({ nullable: true })
  type: number;

  @CreateDateColumn({ nullable: true })
  dateCreation: Date;
}
