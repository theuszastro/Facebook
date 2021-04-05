import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Friend from '../database/models/Friend';

import FriendView from '../views/FriendView';

class FriendController {
   async getAllFriends (req: Request, res: Response){
      const Repository = getRepository(Friend);

      const Friends = await Repository.find({ relations: ['friend', 'friend.avatars', 'user'], where: { user: { id: req.body.userId } } });
      if(!Friends) throw Error('Amigo');

      return res.status(200).json({ friends: FriendView.renderMultipleFriend(Friends) });
   }

   async DeleteFriend(req: Request, res: Response){
      const Repository = getRepository(Friend);

      const Amigo = await Repository.findOne(req.params.id, { relations: ['friend', 'user'] });
      if(!Amigo) throw Error('Amigo');

      const OtherFriend = await Repository.findOne({ where: { friend: Amigo.user.id, user: Amigo.friend.id } });
      if(!OtherFriend) throw Error('Amigo');

      await Repository.delete(OtherFriend.id);
      await Repository.delete(req.params.id);

      return res.status(200).send();
   }

   async DeleteAll(req: Request, res: Response){
      const Repository = getRepository(Friend);

      const Amigos = await Repository.find();

      await Repository.delete(Amigos.map(item => (item.id)));

      return res.status(200).send();
   }
}

export default new FriendController;