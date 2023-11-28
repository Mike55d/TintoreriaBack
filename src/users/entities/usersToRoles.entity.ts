import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity('users_roles')
export class UsersToRoles {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(() => User, user => user.roles,{
    orphanedRowAction: 'delete'
  })
  user: User;

  @ManyToOne(() => Role, role => role.users,{nullable:true})
  role: Role;

}
