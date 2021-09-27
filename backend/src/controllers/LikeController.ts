import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import BaseMiddleware from '../middlewares/BaseMiddleware';

import Like from '../database/models/Like';

import LikeView from '../views/LikeView';
import { format } from 'path';

class LikeController {
   async create(req: Request, res: Response) {
      const Repository = getRepository(Like);

      const { post, reaction, userId } = req.body;

      const currentPost = await BaseMiddleware.getPost(post);
      if (!currentPost) throw Error('post not exists');

      const feedback = await Repository.findOne({
         relations: ['post'],
         where: {
            ...(post && { post: { id: post } }),
            user: userId,
         },
      });

      if (feedback) {
         feedback.reaction = reaction;

         await Repository.save(feedback);

         return res.status(201).json(feedback);
      }

      const newFeedback = Repository.create({
         reaction,
         ...(post && { post: post }),
         user: userId,
      });

      await Repository.save(newFeedback);

      return res.status(201).json(newFeedback);
   }

   async delete(req: Request, res: Response) {
      const Repository = getRepository(Like);

      const { id } = req.params;

      const like = await Repository.findOne(id);

      if (like) {
         await Repository.delete(like.id);

         return res.status(200).send();
      }

      throw Error('reaction invalid');
   }
}

export default new LikeController();
