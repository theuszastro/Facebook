import { getRepository } from 'typeorm';
import FriendModel from '../../database/models/Friend';

import UserModel from '../../database/models/User';

class SocketUserController {
   async changeUserTheme(user: string, theme: string) {
      const Repository = getRepository(UserModel);

      const User = await Repository.findOne(user);

      if(User) {
         User.theme = theme;

         await Repository.save(User);
      }
   }

   async findUserById(user: string, query: string) {
      const Repository = getRepository(UserModel);
      const relations = ['avatars', 'friends', 'friends.friend', 'friends.friend.avatars'];

      const User = await Repository.findOne(user, { relations });

      if(User) {
         const Friends: FriendModel[] = [];

         User.friends.map(item => {
            const nome = item.friend.firstname.toLowerCase();
            const sobrenome = item.friend.lastname.toLowerCase();
            const completeNome = `${nome} ${sobrenome}`;

            if(nome.includes(query)) {
               Friends.push(item);

               return;
            }

            if(sobrenome.includes(query)) {
               Friends.push(item);

               return;
            }

            if(completeNome.includes(query)) {
               Friends.push(item);

               return;
            }
         })

         return [...Friends];
      }

      return [];
   }
}

export default new SocketUserController();