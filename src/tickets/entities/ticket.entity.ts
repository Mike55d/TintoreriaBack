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

  @ManyToMany(() => UserGlpi, { cascade: true })
  @JoinTable()
  requesting_users: UserGlpi[];

  @ManyToMany(() => UserGlpi, { cascade: true })
  @JoinTable()
  observer_users: UserGlpi[];

  @ManyToMany(() => UserGlpi, { cascade: true })
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

  get json() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      requesting_users: this.requesting_users,
      observer_users: this.observer_users,
      assigned_users: this.assigned_users,
      priority: this.priority.id,
      type: this.type.id,
      impact: this.impact.id,
      urgency: this.urgency.id,
      status: this.status.id,
      comments: this.comments
    };
  }
}
