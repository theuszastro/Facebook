import UserModel from '../database/models/User';

class UserView {
   renderSingleSimpleUser(user: UserModel) {
      return {
         id: user.id,
         firstname: user.firstname,
         lastname: user.lastname,
         sex: user.sex,
         online: Boolean(user.online),
         avatars: user.avatars,
      };
   }

   renderSingleUser(user: UserModel) {
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

   renderMultiplySimpleUser(users: UserModel[]) {
      return users.map(user => this.renderSingleSimpleUser(user));
   }

   renderMultiplyUser(users: UserModel[]) {
      return users.map(user => this.renderSingleUser(user));
   }
}

export default new UserView();
