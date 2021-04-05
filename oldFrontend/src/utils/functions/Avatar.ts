import female from '../../assets/user_female.jpg';
import male from '../../assets/user_male.jpg';

import { AvatarType } from '../../context/types';

interface UserType {
   sex: string;
   avatars: AvatarType[];
}

const getAvatarUrl = (user: UserType) => {
   if (user.avatars.length) {
      return `http://localhost:3333/file/${user.avatars[0].path}`;
   }

   return user.sex === 'Female' ? female : male;
};

export { getAvatarUrl };
