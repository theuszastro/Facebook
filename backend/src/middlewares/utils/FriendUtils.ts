import { prisma } from '../../database/connection';

class FriendUtils {
   async checkFriend(id: string, user: any) {
      const Friend = await prisma.friend.findUnique({
         where: { id },
         include: {
            user: true,
            friend: true,
         },
      });
      if (!Friend) throw Error('friend not exist');

      const ids = [Friend.friend.id, Friend.user.id];
      if (!ids.includes(user)) throw Error('without permission');
   }
}

export default new FriendUtils();
