import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'email_settings' })
export class EmailSetting {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  systemDomain: string;

  // Email Collector

  @Column({ default: false })
  collectorEnabled: boolean;

  @Column({ nullable: true })
  collectorMailbox: string;

  @Column({ nullable: true })
  collectorFolderId: string;

  @Column({ nullable: true })
  collectorFolderName: string;

  @Column({ default: false })
  collectorAutoResponse: boolean;

  @Column({ nullable: true, length: 4096 })
  collectorResponse: string;

  // Email followup

  @Column({ type: 'longtext', nullable: true })
  systemSignature: string;

  @Column({ nullable: true, length: 4096 })
  ticketTemplate: string;

  @Column({ nullable: true, length: 4096 })
  iocTemplate: string;
}
