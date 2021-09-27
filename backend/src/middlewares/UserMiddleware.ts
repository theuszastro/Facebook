import { Request, Response, NextFunction } from 'express';

import UserUtils from './utils/UserUtils';
import BaseMiddleware from './BaseMiddleware';

const UserAllowed = {
   create: [],
   update: [
      'firstname',
      'lastname',
      'email',
      'phone',
      'password',
      'sex',
      'pronoun',
      'date_birth',
      'online',
      'theme',
   ],
};

class UserMiddleware {
   async checkUser(req: Request, res: Response, next: NextFunction) {
      const { email, phone } = req.body;
      const User = await BaseMiddleware.getUser(email, phone);

      if (User) {
         if (email) {
            throw Error('email in use');
         }

         if (phone) {
            throw Error('phone in use');
         }
      }

      next();
   }

   async validToken(req: Request, res: Response, next: NextFunction) {
      const { id, office } = await BaseMiddleware.checkTokenInfo(req);

      if (req.params.id && req.path.includes('/user')) {
         UserUtils.compareUserId(id, office, req);
      }

      req.body.userId = id;

      next();
   }
}

export default new UserMiddleware();
