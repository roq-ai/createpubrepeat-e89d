const mapping: Record<string, string> = {
  campaigns: 'campaign',
  collaborators: 'collaborator',
  creators: 'creator',
  'social-media-accounts': 'social_media_account',
  subscriptions: 'subscription',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
