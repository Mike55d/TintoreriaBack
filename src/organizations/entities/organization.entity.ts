import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { OperationLevel } from '../organizations.types';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../roles/entities/role.entity';
@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  domain?: string;

  @CreateDateColumn()
  regDate: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ nullable: true })
  colorTopbar: string;

  @Column({ nullable: true })
  logo: string;

  @Column()
  operationLevel: OperationLevel;

  @OneToMany(() => User, user => user.org)
  users: User[];

  @OneToMany(() => Role, role => role.org)
  roles: Role[];

  get json() {
    return {
      id: this.id,
      name: this.name,
      domain: this.domain,
      regDate: this.regDate,
      updated: this.updated,
      colorTopbar: this.colorTopbar,
      operationLevel: this.operationLevel,
      logo: this.logo,
      usersCount: this.users?.length,
    };
  }
}
