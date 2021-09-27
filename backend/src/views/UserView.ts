import type { User, File } from '@prisma/client';

type NewUser = User & {
   avatars: File[];
};

class UserView {
   renderSingleSimpleUser(user: NewUser) {
      return {
         id: user.id,
         firstname: user.firstname,
         lastname: user.lastname,
         sex: user.sex,
         online: Boolean(user.online),
         avatars: user.avatars,
      };
   }

   renderSingleUser(user: NewUser) {
      return {
         id: user.id,
         firstname: user.firstname,
         lastname: user.lastname,
         email: user.email,
         phone: user.phone,
         sex: user.sex,
         pronoun: user.pronoun,
         date_birth: user.date_birth,
         online: Boolean(user.online),
         theme: user.theme,
         avatars: user.avatars,
         updatedAt: user.updatedAt,
         createdAt: user.createdAt,
      };
   }

   renderMultiplySimpleUser(users: NewUser[]) {
      return users.map(user => this.renderSingleSimpleUser(user));
   }

   renderMultiplyUser(users: NewUser[]) {
      return users.map(user => this.renderSingleUser(user));
   }
}

export default new UserView();
