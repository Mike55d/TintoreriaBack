import {
  Column,
  CreateDateColumn,
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
import { ClientAsset } from '../../client-asset/entities/client-asset.entity';
import { Category } from '../../categories/entities/category.entity';
import { AlertTitle } from '../../categories/entities/alert-title.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text', { default: null })
  description?: string;

  @CreateDateColumn()
  openingDate: Date;

  @Column({ nullable: true })
  eventDate?: Date;

  @Column({ nullable: true })
  assignDate?: Date;

  @Column({ type: 'longtext', nullable: true })
  eventDescription?: string;

  @Column({ nullable: true })
  possibleImpact?: string;

  @Column({ nullable: true })
  recommendation?: string;

  @Column({ type: 'longtext', nullable: true })
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

  @ManyToOne(() => ClientAsset)
  asset: ClientAsset;

  @ManyToOne(() => Category, category => category.tickets, {
    nullable: true
  })
  category?: Category;

  @ManyToOne(() => AlertTitle, alertTitle => alertTitle.tickets, {
    nullable: true
  })
  alertTitle?: AlertTitle;

  get json() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      openingDate: this.openingDate,
      eventDate: this.eventDate,
      assignDate: this.assignDate,
      eventDescription: this.eventDescription,
      possibleImpact: this.possibleImpact,
      recommendation: this.recommendation,
      indicesIC: this.indicesIC,
      requesting_users: this.requesting_users?.map(user => ({
        ...user?.user,
        email: user.email ?? user.user?.email
      })),
      observer_users: this.observer_users?.map(user => ({
        ...user?.user,
        email: user.email ?? user.user?.email
      })),
      assigned_users: this.assigned_users?.map(user => ({
        ...user?.user,
        email: user.email ?? user.user?.email
      })),
      priority: this.priority,
      type: this.type,
      impact: this.impact,
      urgency: this.urgency,
      status: this.status,
      comments: this.comments,
      client: this.client,
      asset: this.asset,
      category: this?.category,
      alertTitle: this?.alertTitle
    };
  }
}
