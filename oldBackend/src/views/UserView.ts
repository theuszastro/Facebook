import User from '../database/models/User';
import Covers from '../database/models/Capa';

import FriendModel from '../database/models/Friend';

import AvatarView from './AvatarsView';

import dayjs from 'dayjs';

export interface PostagemAndShares {
   createdAt: string;
}

class UserView {
   RenderSingleUser(user: User, Token?: string) {
      return {
         id: user.id,
         firstname: user.firstname,
         lastname: user.lastname,
         completeName: user.completeName,
         phone: user.phone,
         sex: user.sex,
         pronoun: user.pronoun,
         email: user.email,
         online: Boolean(user.online),
         theme: user.theme,
         date_birth: user.date_birth,
         avatars: AvatarView.RenderMultipleAvatar(user.avatars),
         updadedAt: dayjs().format('LLLL'),
         createdAt: dayjs(user.createdAt).format('LL'),
         ...(Token && { token: Token }),
      };
   }

   RenderMultipleUser(users: User[]) {
      return users.map(user => this.RenderSingleUser(user));
   }

   RenderSimpleUser(user: User) {
      return {
         id: user.id,
         firstname: user.firstname,
         lastname: user.lastname,
         sex: user.sex,
         online: Boolean(user.online),
         avatars: AvatarView.RenderMultipleAvatar(user.avatars),
      };
   }

   RenderSimpleUsers(users: User[]) {
      return users.map(user => this.RenderSimpleUser(user));
   }

   RenderFriends(friend: FriendModel[]) {
      if (friend) {
         return friend.map(item => {
            return {
               id: item.id,
               friend: {
                  id: item.friend.id,
                  firstname: item.friend.firstname,
                  lastname: item.friend.lastname,
                  phone: item.friend.phone,
                  email: item.friend.email,
                  sex: item.friend.sex,
                  date_birth: item.friend.date_birth,
                  updatedAt: item.friend.updatedAt,
                  createdAt: item.friend.createdAt,
               },
               createdAt: item.createdAt,
            };
         });
      } else {
         return [];
      }
   }

   RenderCovers(covers: Covers[]) {
      const Decrescente = (a: Covers, b: Covers) => {
         const DataA = dayjs(a.createdAt) as any;
         const DataB = dayjs(b.createdAt) as any;

         return DataB - DataA;
      };

      const Covers = covers.sort(Decrescente);

      return Covers.map(cover => ({
         id: cover.id,
         path: cover.path,
         createdAt: cover.createdAt,
      }));
   }
}

export default new UserView();
