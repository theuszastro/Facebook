import { Request, Response } from 'express';

import dayjs from 'dayjs';
import { v4 } from 'uuid';

import { prisma } from '../database/connection';

import BaseMiddleware from '../middlewares/BaseMiddleware';

import LikeView from '../views/LikeView';

class LikeController {
   async create(req: Request, res: Response) {
      const { post, reaction, userId } = req.body;

      const currentPost = await BaseMiddleware.getPost(post);
      if (!currentPost) throw Error('post not exists');

      const feedback = await prisma.like.findFirst({
         where: {
            ...(post && { postId: post }),
            userId: userId,
         },
         include: {
            post: true,
         },
      });

      if (feedback) {
         const newFeedback = await prisma.like.update({
            where: {
               id: feedback.id,
            },
            data: {
               reaction,
            },
         });

         return res.status(201).json(newFeedback);
      }

      const newFeedback = await prisma.like.create({
         data: {
            id: v4(),
            reaction,
            ...(post && {
               post: {
                  connect: {
                     id: post,
                  },
               },
            }),
            user: {
               connect: {
                  id: userId,
               },
            },
            createdAt: dayjs().format(),
         },
      });

      return res.status(201).json(newFeedback);
   }

   async delete(req: Request, res: Response) {
      const { id } = req.params;

      await prisma.like.delete({ where: { id } });

      return res.status(200).send();
   }
}

export default new LikeController();
