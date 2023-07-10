import { CreatorInterface } from 'interfaces/creator';
import { GetQueryInterface } from 'interfaces';

export interface CampaignInterface {
  id?: string;
  name: string;
  start_date: any;
  end_date: any;
  creator_id?: string;
  created_at?: any;
  updated_at?: any;

  creator?: CreatorInterface;
  _count?: {};
}

export interface CampaignGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  creator_id?: string;
}
