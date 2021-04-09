import { Request, Response, NextFunction } from 'express';

import FriendUtils from './utils/FriendUtils';

class FriendMiddleware {
   async validFriend(req: Request, res: Response, next: NextFunction) {
      const { id } = req.params;
      const { userId } = req.body;

      await FriendUtils.checkFriend(id, userId);

      next();
   }
}

export default new FriendMiddleware();
