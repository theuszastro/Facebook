import Friend from '../database/models/Friend';

import UserView from './UserView';

class FriendView {
   renderSingleFriend(friend: Friend){
      return {
         id: friend.id,
         friend: UserView.RenderSimpleUser(friend.friend),
         createdAt: friend.createdAt
      }
   }

   renderMultipleFriend(friends: Friend[]){
      return friends.map(item => this.renderSingleFriend(item));
   }
}

export default new FriendView;