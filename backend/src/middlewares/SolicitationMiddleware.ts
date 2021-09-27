import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { UserMiddleware } from '.';

import SolicitationModel from '../database/models/Solicitation';

import BaseMiddleware from './BaseMiddleware';

import SolicitationUtils from './utils/SolicitationUtils';
import UserUtils from './utils/UserUtils';

const SolicitationAllowed = {
   create: ['to'],
   update: ['status'],
};

class SolicitationMiddleware {
   async checkSolicitation(req: Request, res: Response, next: NextFunction) {
      const { status, to, userId } = req.body;

      switch (req.method.toLocaleLowerCase()) {
         case 'put':
            const allowedStatus = ['Accepted', 'Declined'];
            await SolicitationUtils.checkAlreadyUpdated(req.params.id, userId);

            if (!allowedStatus.includes(status)) throw Error('data invalid');

            break;

         case 'post':
            await SolicitationUtils.checkSolicitation(userId, to);

            const user = await BaseMiddleware.getUserById(to);
            if (!user) throw Error('user not exist');

            break;
      }

      next();
   }

   async validExistsSolicitation(req: Request, res: Response, next: NextFunction) {
      const Repository = getRepository(SolicitationModel);
      const Solic = await Repository.findOne(req.params.id, { relations: ['from', 'to'] });

      const { userId } = req.body;

      if (!Solic) throw Error('solicitation not exist');
      if (Solic.from.id != userId && Solic.to.id != userId) throw Error('without permission');

      next();
   }
}

export default new SolicitationMiddleware();
