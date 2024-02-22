import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EmailNotification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  mailbox: string;

  @Column({ nullable: true })
  folderId: number;

  @Column({ nullable: true, length: 4096})
  ticketTemplate: string;

  @Column({ nullable: true, length: 4096})
  iocTemplate: string;
}
