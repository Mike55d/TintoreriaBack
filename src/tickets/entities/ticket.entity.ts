import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Priority } from './priority.entity';
import { Type } from './type.entity';
import { Impact } from './impact.entity';
import { Urgency } from './urgency.entity';
import { UserGlpi } from './user-glpi.entity';
import { Status } from './status.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text', { default: null })
  description?: string;

  @ManyToMany(() => UserGlpi)
  @JoinTable()
  requesting_users: UserGlpi[];

  @ManyToMany(() => UserGlpi)
  @JoinTable()
  observer_users: UserGlpi[];

  @ManyToMany(() => UserGlpi)
  @JoinTable()
  assigned_users: UserGlpi[];

  @ManyToOne(() => Priority, { cascade: true, nullable: true })
  priority: Priority;

  @ManyToOne(() => Type, { cascade: true, nullable: true })
  type: Type;

  @ManyToOne(() => Impact, { cascade: true, nullable: true })
  impact: Impact;

  @ManyToOne(() => Urgency, { cascade: true, nullable: true })
  urgency: Urgency;

  @ManyToOne(() => Status, { cascade: true, nullable: true })
  status: Status;

  @Column('text', { default: null })
  comments?: string;
}
