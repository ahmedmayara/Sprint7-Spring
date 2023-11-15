import { Role } from './role.model';

export class User {
  user_id!: number;
  username!: string;
  email!: string;
  password!: string;
  enabled!: boolean;
  roles!: Role[];
}
