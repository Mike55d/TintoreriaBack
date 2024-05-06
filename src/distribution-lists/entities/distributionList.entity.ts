import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AlertTitle } from '../../categories/entities/alert-title.entity';
import { Client } from '../../clients/entities/clients.entity';

@Entity()
export class DistributionList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  emails?: string;

  @ManyToOne(() => Client, client => client.distributionLists)
  client: Client;

  @ManyToOne(() => AlertTitle, alertTitle => alertTitle.distributionLists)
  alertTitle: AlertTitle;

  get json() {
    return {
      id: this.id,
      name: this.name,
      emails: this.emails?.split(','),
      alertTitle: this.alertTitle
    };
  }
}
