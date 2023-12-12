import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Priority } from './priority.entity';
import { Type } from './type.entity';
import { Impact } from './impact.entity';
import { Urgency } from './urgency.entity';
import { Status } from './status.entity';
import { AssignUser } from './assign-users.entity';
import { CommentTicket } from './comment-ticket.entity';
import { Client } from '../../clients/entities/clients.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text', { default: null })
  description?: string;

  @Column()
  openingDate: Date;

  @Column()
  eventDate: Date;

  @Column()
  assignDate: Date;

  @Column()
  eventDescription?: string;

  @Column()
  possibleImpact?: string;

  @Column()
  recommendation?: string;

  @Column({type:'longtext'})
  indicesIC?: string;
  
  @ManyToMany(() => AssignUser, { cascade: true })
  @JoinTable()
  requesting_users: AssignUser[];

  @ManyToMany(() => AssignUser, { cascade: true })
  @JoinTable()
  observer_users: AssignUser[];

  @ManyToMany(() => AssignUser, { cascade: true })
  @JoinTable()
  assigned_users: AssignUser[];

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

  @OneToMany(() => CommentTicket, comment => comment.ticket, { cascade: true })
  comments?: CommentTicket[];

  @ManyToOne(() => Client)
  client: Client;

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
