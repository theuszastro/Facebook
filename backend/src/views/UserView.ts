import UserModel from '../database/models/User';

class UserView {
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
         updatedAt: user.updatedAt,
         createdAt: user.createdAt,
      };
   }

   renderMultipleUsers(users: UserModel[]) {
      return users.map(user => this.renderSingleUser(user));
   }
}

export default new UserView();
