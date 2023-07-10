import { CampaignInterface } from 'interfaces/campaign';
import { CollaboratorInterface } from 'interfaces/collaborator';
import { SocialMediaAccountInterface } from 'interfaces/social-media-account';
import { SubscriptionInterface } from 'interfaces/subscription';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CreatorInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  campaign?: CampaignInterface[];
  collaborator?: CollaboratorInterface[];
  social_media_account?: SocialMediaAccountInterface[];
  subscription?: SubscriptionInterface[];
  user?: UserInterface;
  _count?: {
    campaign?: number;
    collaborator?: number;
    social_media_account?: number;
    subscription?: number;
  };
}

export interface CreatorGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
