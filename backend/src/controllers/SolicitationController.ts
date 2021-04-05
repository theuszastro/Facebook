import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import SolicitationModel from '../database/models/Solicitation';

const isTest = process.env.NODE_ENV === 'test';

class SolicitationController {
   async list(req: Request, res: Response) {
      const Repository = getRepository(SolicitationModel);

      const Solis = await Repository.find({ where: { to: req.body.userId } });

      return res.status(200).json(Solis);
   }

   async create(req: Request, res: Response) {
      const Repository = getRepository(SolicitationModel);

      const { userId, to } = req.body;

      const soli = Repository.create({
         from: userId,
         to: to,
         status: 'Pending',
      });

      await Repository.save(soli);

      if (isTest) {
         return res.status(201).send(soli);
      }

      return res.status(201).send();
   }

   async update(req: Request, res: Response) {
      const Repository = getRepository(SolicitationModel);

      const { status } = req.body;

      const Soli = await Repository.findOne(req.params.id);

      Soli.status = status;

      await Repository.save(Soli);

      if (isTest) {
         return res.status(200).json(Soli);
      }

      return res.status(200).send();
   }

   async delete(req: Request, res: Response) {
      const Repository = getRepository(SolicitationModel);

      await Repository.delete(req.params.id);

      return res.status(200).send();
   }
}

export default new SolicitationController();
