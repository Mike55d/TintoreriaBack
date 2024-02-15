import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ticket-settings')
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext', nullable: true })
  signature: string;

  @Column({ nullable: true })
  domain: string;
}
