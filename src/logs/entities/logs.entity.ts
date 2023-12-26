import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
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
    type: 'int',
    nullable: true
  })
  category?: LogCategory;

  @Column({
    type: 'int',
    nullable: true
  })
  subCategory?: LogSubCategory;

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

  @Column({ nullable: true })
  logId?: string;

  @Column({ nullable: true })
  user_email?: string;

  @Column({ nullable: true })
  method?: string;

  @Column({ nullable: true })
  entity?: string;

  @Column({ nullable: true })
  statusResponse?: string;
}
