import { CreatorInterface } from 'interfaces/creator';
import { GetQueryInterface } from 'interfaces';

export interface SocialMediaAccountInterface {
  id?: string;
  platform_name: string;
  account_name: string;
  creator_id?: string;
  created_at?: any;
  updated_at?: any;

  creator?: CreatorInterface;
  _count?: {};
}

export interface SocialMediaAccountGetQueryInterface extends GetQueryInterface {
  id?: string;
  platform_name?: string;
  account_name?: string;
  creator_id?: string;
}
