import { CreatorInterface } from 'interfaces/creator';
import { GetQueryInterface } from 'interfaces';

export interface SubscriptionInterface {
  id?: string;
  service_name: string;
  subscription_date: any;
  creator_id?: string;
  created_at?: any;
  updated_at?: any;

  creator?: CreatorInterface;
  _count?: {};
}

export interface SubscriptionGetQueryInterface extends GetQueryInterface {
  id?: string;
  service_name?: string;
  creator_id?: string;
}
