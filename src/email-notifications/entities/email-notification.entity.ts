import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EmailNotification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  mailbox: string;

  @Column({ nullable: true })
  folderId: number;
}
