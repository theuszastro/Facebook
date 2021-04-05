import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Solicitacao from '../database/models/Solicitation';
import Friend from '../database/models/Friend';
// import Notification from '../models/Notification';

class SolicitationController {
	async ListAll(req: Request, res: Response) {
		const Repository = getRepository(Solicitacao);

		const Solicitation = await Repository.find({ where: { to: req.body.userId }, relations: ['from', 'to'] });

		return res.status(200).json(Solicitation);
	}

	async Create(req: Request, res: Response) {
		const Repository = getRepository(Solicitacao);
		const { to } = req.body;

      if(to === req.body.userId) {
         throw Error('soliciation same');
      }

		const Solicitation = Repository.create({
			to: to,
			from: req.body.userId,
		});

		await Repository.save(Solicitation);

		return res.status(201).send();
	}

	async Update(req: Request, res: Response) {
		const Repository = getRepository(Solicitacao);

		const { id, status, userId } = req.body;

		if(!id || !status) throw Error('Dados invalidos');

		const Solicitation = await Repository.findOne(id, { relations: ['to', 'from'] });
		if (!Solicitation) throw Error('Solicitation');

      if(Solicitation.status === 'accepted') {
         throw Error('already accepted');
      }

      if(Solicitation.from.id === userId || Solicitation.to.id === userId){
         Solicitation.status = status;

         status === 'accepted' && (await UpdateFriend(Solicitation.from.id, Solicitation.to.id));

         await Repository.save(Solicitation);

         return res.status(200).send();
      }

      return res.status(401).json({ error: 'sem permissão' });
	}

	async Delete(req: Request, res: Response) {
		const Repository = getRepository(Solicitacao);

      const { userId, cargo } = req.body;

		const Solicitation = await Repository.findOne(req.params.id, { relations: ['to', 'from'] });
		if (!Solicitation) throw Error('Solicitation');

      if(Solicitation.from.id === userId || Solicitation.to.id === userId){
         await Repository.delete(Solicitation.id);

		   return res.status(200).send();
      }

      throw Error('without permission');
	}

	async DeleteAll(req: Request, res: Response) {
		const Repository = getRepository(Solicitacao);

		const Solicitation = await Repository.find();

		await Repository.delete(Solicitation.map(item => item.id));

		return res.status(200).send();
	}
}

export default new SolicitationController();

const UpdateFriend = async (from: any, to: any) => {
	const Repository = getRepository(Friend);

	const UserFrom = Repository.create({
		friend: to,
		user: from,
	});

	const UserTo = Repository.create({
		friend: from,
		user: to,
	});

	await Repository.save(UserFrom);
	await Repository.save(UserTo);
};