import { Request, Response, NextFunction } from 'express';
import { validate } from 'uuid';

import BaseMiddleware from './BaseMiddleware';

class PostMiddleware {
   async validPostOwner(req: Request, res: Response, next: NextFunction) {
      const id = req.params.id;
      const { userId } = req.body;

      const post = await BaseMiddleware.getPost(id);
      if (post.user.id != userId) throw Error('without permission');

      next();
   }

   async validExistsPost(req: Request, res: Response, next: NextFunction) {
      const id = req.params.id;

      if (!validate(id)) throw Error('id invalid');

      const post = await BaseMiddleware.getPost(id);
      if (!post) throw Error('post not exists');

      next();
   }
}

export default new PostMiddleware();
