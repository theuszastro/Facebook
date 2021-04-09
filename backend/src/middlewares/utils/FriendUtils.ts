import { getRepository } from 'typeorm';

import FriendModel from '../../database/models/Friend';

class FriendUtils {
   async checkFriend(id: string, user: any) {
      const Repository = getRepository(FriendModel);

      const Friend = await Repository.findOne(id, { relations: ['user', 'friend'] });
      if (!Friend) throw Error('friend not exist');

      const ids = [Friend.friend.id, Friend.user.id];
      if (!ids.includes(user)) throw Error('without permission');
   }
}

export default new FriendUtils();
