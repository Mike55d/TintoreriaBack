import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne
} from 'typeorm';
import { LogCategory, LogLevel, LogSubCategory } from '../logs.types';

@Entity({ name: 'logs' })
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int'
  })
  level: LogLevel;

  @Column({
    type: 'int'
  })
  category: LogCategory;

  @Column({
    type: 'int'
  })
  subCategory: LogSubCategory;

  @Column('text')
  message: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ type: 'int', nullable: true })
  errorNum?: number;

  @Column({ type: 'simple-json', nullable: true })
  details: any;

  @CreateDateColumn({ name: 'reg_date' })
  regDate: Date;

}
