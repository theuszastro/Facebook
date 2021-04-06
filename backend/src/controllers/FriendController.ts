import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import FriendModel from '../database/models/Friend';

class FriendController {
   async list(req: Request, res: Response) {
      const Repository = getRepository(FriendModel);

      const Friends = await Repository.find({
         where: { user: req.body.userId },
         relations: ['friend', 'user'],
      });

      return res.status(200).json(Friends);
   }

   async create(user: any, friend: any) {
      const Repository = getRepository(FriendModel);

      const from = Repository.create({ user, friend });
      const to = Repository.create({ user: friend, friend: user });

      await Repository.save(from);
      await Repository.save(to);
   }

   async delete(req: Request, res: Response) {
      const Repository = getRepository(FriendModel);

      await Repository.delete(req.params.id);

      return res.status(200).send();
   }
}

export default new FriendController();
