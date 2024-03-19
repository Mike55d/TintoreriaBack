import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GlpiTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  userGlpiId: number;

  @Column({nullable:true})
  title: string;

  @Column({nullable:true})
  date: Date;

  @Column({nullable:true})
  closedate: Date;

  @Column({nullable:true})
  solvedate: Date;

  @Column({nullable:true})
  status: number;

  @Column('longtext')
  description?: string;

  @Column({nullable:true})
  urgency: number;

  @Column({nullable:true})
  impact: number;

  @Column({nullable:true})
  priority: number;

  @Column({nullable:true})
  type: number;

  @CreateDateColumn({nullable:true})
  dateCreation: Date;
}
