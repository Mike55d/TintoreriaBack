import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ExternalApplication } from '../../external-application/entities/external-application.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column({ length: 512 })
  token: string;

  @Column({ type: 'bool', default: false })
  confirmed?: boolean;

  @Column({ nullable: true })
  localToken?: Buffer;

  @Column({ nullable: true })
  fcmToken: string;

  @Column({ nullable: true })
  msToken: string;

  @Column({ nullable: true })
  deviceId: string;

  @CreateDateColumn()
  regDate: Date;

  @UpdateDateColumn()
  lastUpdate: Date;

  @ManyToOne(() => ExternalApplication)
  app: ExternalApplication;

  get json() {
    return {
      id: this.id,
      token: this.token,
      deviceId: this.deviceId,
      regDate: this.regDate,
      user: this.user.json,
      app: this.app
    };
  }
}
