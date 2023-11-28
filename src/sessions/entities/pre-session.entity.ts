import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PreSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text',{ nullable: true, default: null })
  clientEphemeral: string;

  @Column({ nullable: true, default: null })
  serverEphemeralSecret: string;

  @Column()
  username: string;

  @Column('text', { nullable: true, default: null })
  userApproval: string;
}
