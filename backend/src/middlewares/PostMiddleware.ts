import { Request, Response, NextFunction } from 'express';
import { validate } from 'uuid';

import BaseMiddleware from './BaseMiddleware';

const PostAllowed = {
   create: ['description', 'files'],
   update: ['description', 'oldFiles', 'files'],
};

class PostMiddleware {
   async validPostData(req: Request, res: Response, next: NextFunction) {
      const body: string[] = [];

      const isPost = req.method === 'POST';
      const isPut = req.method === 'PUT';

      const key = isPost ? 'create' : isPut ? 'update' : '';

      Object.entries(req.body).map((item: [string, string]) => {
         if (PostAllowed[key].includes(item[0]) && item[1].length) {
            body.push(item[0]);
         }
      });

      if (body.length != 2 && body.length != 1) {
         throw Error('data invalid');
      }

      next();
   }

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
