import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  Index,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { Permission } from '../../roles/roles.types';
import { Session } from '../../sessions/entities/session.entity';
import { UserProfile } from './user-profile.entity';
import { UsersToRoles } from './usersToRoles.entity';

@Entity()
@Index(['email', 'deleted'])
export class User {
  @PrimaryGeneratedColumn({ name: 'id_user' })
  id: number;

  @Column({ nullable: true })
  name?: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 1 })
  status: number;

  @OneToOne(() => UserProfile, { cascade: true, eager: true })
  @JoinColumn({ name: 'user_profile' })
  profile: UserProfile;

  @OneToMany(() => UsersToRoles, roles => roles.user ,{ cascade: true })
  roles: UsersToRoles[];

  @Column({ nullable: true })
  lastConnection?: Date;

  @CreateDateColumn()
  regDate: Date;

  @UpdateDateColumn()
  lastUpdate: Date;

  @OneToMany(() => Session, session => session.user, { cascade: true })
  sessions?: Session[];

  @Column({ default: false })
  deleted: boolean;

  @ManyToOne(() => User)
  registrar: User;

  @Column({ default: null })
  salt: string;

  @Column('text', { default: null })
  verifier: string;

  @Column({ default: false })
  support: boolean;

  currentSession: Partial<Session>;

  get json() {
    return {
      id: this.id,
      status: this.status,
      lastConnection: this.lastConnection,
      name: this.name,
      email: this.email,
      profile: this.profile?.json,
      regDate: this.regDate,
      lastUpdate: this.lastUpdate,
      roles: this.roles?.filter(x => x.role).map(x => x.role?.json),
      support: this.support,
      permissions: this.permissions,
      registrar: !this.registrar ? null : this.registrar.registrarInfo
    };
  }

  get registrarInfo() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }

  get permissions() {
    const result = new Set<Permission>();
    this.roles?.forEach(usersToRoles => {
      usersToRoles.role?.permissions.forEach(permission => result.add(permission));
    });
    return [...result.values()];
  }

}
