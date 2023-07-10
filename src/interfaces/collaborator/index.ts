import { CreatorInterface } from 'interfaces/creator';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CollaboratorInterface {
  id?: string;
  name: string;
  creator_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  creator?: CreatorInterface;
  user?: UserInterface;
  _count?: {};
}

export interface CollaboratorGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  creator_id?: string;
  user_id?: string;
}
