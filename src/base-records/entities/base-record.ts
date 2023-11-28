import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export abstract class BaseRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  deleted: boolean;

  @CreateDateColumn()
  regDate: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(() => User)
  registrar: User;

  json() {
    return {
      id: this.id,
      regDate: this.regDate,
      updated: this.updated,
      registrar: this.registrar ? this.registrar.registrarInfo : null
    };
  }
}
