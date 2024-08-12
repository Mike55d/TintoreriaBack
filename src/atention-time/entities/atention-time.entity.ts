import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Type } from '../../tickets/entities/type.entity';
import { Priority } from '../../tickets/entities/priority.entity';

@Entity()
export class AtentionTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: number;

  @Column()
  typeTime: number;

  @ManyToOne(() => Type)
  type: Type;

  @ManyToOne(() => Priority)
  priority: Priority;

  get json() {
    return {
      id: this.id,
      time: this.time,
      typeTime: this.typeTime,
      type: this.type.id,
      priority: this.priority.id
    };
  }
}
