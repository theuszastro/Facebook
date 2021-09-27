import { Request, Response } from 'express';

import { v4 } from 'uuid';
import dayjs from 'dayjs';

import { prisma } from '../database/connection';

class FriendController {
   async list(req: Request, res: Response) {
      const Friends = await prisma.friend.findMany({
         where: { userId: req.body.userId },
         include: {
            friend: true,
            user: true,
         },
      });

      return res.status(200).json(Friends);
   }

   async create(user: any, friend: any) {
      const trans: any[] = [];

      const createdAt = dayjs().format();

      trans.push(
         prisma.friend.create({
            data: {
               user: { connect: { id: user } },
               friend: { connect: { id: friend } },
               id: v4(),
               createdAt,
            },
         }),
         prisma.friend.create({
            data: {
               user: { connect: { id: friend } },
               friend: { connect: { id: user } },
               id: v4(),
               createdAt,
            },
         })
      );

      await prisma.$transaction(trans);
   }

   async delete(req: Request, res: Response) {
      await prisma.friend.delete({ where: { id: req.params.id } });

      return res.status(200).send();
   }
}

export default new FriendController();
