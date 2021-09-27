import FriendModel from 'src/database/models/Friend';

class FriendView {
   renderFriend(friend: FriendModel) {
      return {
         id: friend.id,
         friend: {
            id: friend.friend.id,
            firstname: friend.friend.firstname,
            lastname: friend.friend.lastname,
            sex: friend.friend.sex,
            avatars: friend.friend.avatars,
         },
         createdAt: friend.createdAt,
      };
   }
}

export default new FriendView();
