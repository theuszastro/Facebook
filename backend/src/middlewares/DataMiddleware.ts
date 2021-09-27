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

      const keys: string[] = [];
      const values: any[] = [];

      Object.entries(req.body).map((item: [string, string]) => {
         if (fields.includes(item[0]) && item[1].length) {
            keys.push(item[0]);
            values.push(item[1]);
         }
      });

      if (keys.length < length) throw Error('data invalid');

      const { userId } = req.body;

      const newBody = { ...(userId && { userId }) };
      keys.map((item, index) => (newBody[item] = values[index]));

      req.body = newBody;

      next();
   }
}

export default new DataMiddleware();
