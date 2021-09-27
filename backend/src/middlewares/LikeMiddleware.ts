import { Request, Response, NextFunction } from 'express';

class LikeMiddleware {
   static defaultFields = {
      create: {
         fields: ['post', 'reaction'],
         length: 2,
      },
   };

   validLikeData(req: Request, res: Response, next: NextFunction) {}
}

export default new LikeMiddleware();
