import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from '../roles.types';
import { Organization } from '../../organizations/entities/organization.entity';
import { UsersToRoles } from '../../users/entities/usersToRoles.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn({ name: 'id_role' })
  id: number;

  @Column()
  name: string;

  @Column('simple-array')
  permissions: Permission[];

  @Column({ default: true })
  readOnly: boolean;

  @CreateDateColumn()
  regDate: Date;

  @ManyToOne(() => Organization, org => org.roles)
  org: Organization;

  // @Column({ default: false })
  // hideRole: boolean;

  @OneToMany(() => UsersToRoles, roles => roles.user )
  users: UsersToRoles[];

  get json() {
    return {
      id: this.id,
      name: this.name,
      permissions: this.permissions,
      regDate: this.regDate,
      readOnly: this.readOnly
    };
  }
}
