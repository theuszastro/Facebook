import { Request, Response, NextFunction } from 'express';

import UserUtils from './utils/UserUtils';
import BaseMiddleware from './BaseMiddleware';

const UserAllowed = {
   create: [
      'firstname',
      'lastname',
      'email',
      'phone',
      'password',
      'sex',
      'pronoun',
      'date_birth',
   ],
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
   async validCreateData(req: Request, res: Response, next: NextFunction) {
      const body: string[] = [];

      Object.entries(req.body).map(item => {
         if (UserAllowed.create.includes(item[0]) && item[1]) {
            body.push(item[0]);
         }
      });

      if (body.length != 7) {
         throw Error('data invalid');
      }

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

   async validUpdateData(req: Request, res: Response, next: NextFunction) {
      const { id, office } = await BaseMiddleware.checkTokenInfo(req);
      UserUtils.compareUserId(id, office, req);

      const body: [string, unknown][] = [];

      Object.entries(req.body).map(item => {
         if (UserAllowed.update.includes(item[0]) && item[1]) {
            body.push([item[0], item[1]]);
         }
      });

      if (body.length <= 0) {
         throw Error('data invalid');
      }

      const newBodyObject = {} as { [key: string]: unknown };
      body.map(item => (newBodyObject[item[0]] = item[1]));

      req.body = newBodyObject;

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
