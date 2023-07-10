import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { creatorValidationSchema } from 'validationSchema/creators';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getCreators();
    case 'POST':
      return createCreator();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCreators() {
    const data = await prisma.creator
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'creator'));
    return res.status(200).json(data);
  }

  async function createCreator() {
    await creatorValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.campaign?.length > 0) {
      const create_campaign = body.campaign;
      body.campaign = {
        create: create_campaign,
      };
    } else {
      delete body.campaign;
    }
    if (body?.collaborator?.length > 0) {
      const create_collaborator = body.collaborator;
      body.collaborator = {
        create: create_collaborator,
      };
    } else {
      delete body.collaborator;
    }
    if (body?.social_media_account?.length > 0) {
      const create_social_media_account = body.social_media_account;
      body.social_media_account = {
        create: create_social_media_account,
      };
    } else {
      delete body.social_media_account;
    }
    if (body?.subscription?.length > 0) {
      const create_subscription = body.subscription;
      body.subscription = {
        create: create_subscription,
      };
    } else {
      delete body.subscription;
    }
    const data = await prisma.creator.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
