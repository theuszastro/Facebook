import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import SolicitationModel from '../database/models/Solicitation';

import BaseMiddleware from './BaseMiddleware';

import SolicitationUtils from './utils/SolicitationUtils';

const SolicitationAllowed = {
   create: ['to'],
   update: ['status'],
};

class SolicitationMiddleware {
   async validSolicitationCreateData(req: Request, res: Response, next: NextFunction) {
      const { userId, to } = req.body;
      const body: string[] = [];

      Object.entries(req.body).map(
         item => SolicitationAllowed.create.includes(item[0]) && body.push(item[0])
      );

      if (body.length != SolicitationAllowed.create.length) throw Error('data invalid');

      const User = await BaseMiddleware.getUserById(req.body.to);
      if (!User) throw Error('user not exist');

      await SolicitationUtils.checkSolicitation(userId, to);

      next();
   }

   async validSolicitationUpdateData(req: Request, res: Response, next: NextFunction) {
      const { status, userId } = req.body;
      const allowedStatus = ['Accepted', 'Declined'];
      const body: string[] = [];

      Object.entries(req.body).map(
         item => SolicitationAllowed.update.includes(item[0]) && body.push(item[0])
      );

      if (body.length != SolicitationAllowed.update.length) throw Error('data invalid');

      await SolicitationUtils.checkAlreadyUpdated(req.params.id, userId);

      if (!allowedStatus.includes(status)) throw Error('data invalid');

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
