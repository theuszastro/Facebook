import { Request, Response } from 'express';

import { v4 } from 'uuid';
import dayjs from 'dayjs';

import FriendController from './FriendController';

import { prisma } from '../database/connection';

const isTest = process.env.NODE_ENV === 'test';

class SolicitationController {
   async list(req: Request, res: Response) {
      const Solis = await prisma.solicitation.findMany({ where: { toId: req.body.userId } });

      return res.status(200).json(Solis);
   }

   async create(req: Request, res: Response) {
      const { userId, to } = req.body;

      const soli = await prisma.solicitation.create({
         data: {
            id: v4(),
            from: {
               connect: {
                  id: userId,
               },
            },
            to: {
               connect: {
                  id: to,
               },
            },
            status: 'Pending',
            createdAt: dayjs().format(),
         },
      });

      if (isTest) {
         return res.status(201).send(soli);
      }

      return res.status(201).send();
   }

   async update(req: Request, res: Response) {
      const { status } = req.body;

      const Soli = await prisma.solicitation.update({
         where: { id: req.params.id },
         data: { status },
         include: {
            from: true,
            to: true,
         },
      });

      if (status === 'Accepted') {
         await FriendController.create(Soli.from.id, Soli.to.id);
      }

      if (isTest) {
         return res.status(200).json(Soli);
      }

      return res.status(200).send();
   }

   async delete(req: Request, res: Response) {
      await prisma.solicitation.delete({ where: { id: req.params.id } });

      return res.status(200).send();
   }
}

export default new SolicitationController();
