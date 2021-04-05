import { getRepository } from 'typeorm';

import { io } from '../../server';

import FriendModel from '../../database/models/Friend';

import FriendView from '../../views/FriendView';

class SocketFriendController {
   async getFriends(user: string, socketId: string) {
      const Repository = getRepository(FriendModel);
      const relations = ['friend', 'friend.avatars'];

      const Friends = await Repository.find({ where: { user }, relations });

      io.to(socketId).emit('friends', FriendView.renderMultipleFriend(Friends));
   }
}

export default new SocketFriendController;