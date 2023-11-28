import { User } from 'src/users/entities/user.entity';

export interface GoogleAuthResponse {
  user: User;
  token: string;
}
