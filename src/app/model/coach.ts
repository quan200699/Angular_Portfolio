import {Role} from './role';

export interface Coach {
  id?: number;
  coachId?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  notice?: string;
  password?: string;
  roles?: [Role];
}
