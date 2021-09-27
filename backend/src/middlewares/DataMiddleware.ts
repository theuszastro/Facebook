import { Request, Response, NextFunction } from 'express';

import { dataRules } from '../utils/data';

class DataMiddleware {
   rules = dataRules;

   getRules(method: string, path: string) {
      path = path.replace(/(\/[a-z]+)\/.+/, '$1');

      return this.rules[path][method];
   }

   validData(req: Request, res: Response, next: NextFunction) {
      const { fields, length } = this.getRules(req.method.toLowerCase(), req.path);

      const { userId, ...rest } = req.body;
      const newBody = {};

      Object.entries({ ...rest }).map((item: [string, string]) => {
         if (fields.includes(item[0]) && item[1].length) {
            newBody[item[0]] = item[1];
         }
      });

      if (Object.keys(newBody).length < length) throw Error('data invalid');
      if (userId) newBody['userId'] = userId;

      req.body = newBody;

      next();
   }
}

export default new DataMiddleware();
