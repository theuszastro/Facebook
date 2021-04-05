import { AvatarType } from '../../context/types';

import Female from '../../assets/user_female.jpg';
import Male from '../../assets/user_male.jpg';

import Constants from '../Constants';

interface getAvatarUrlProps {
   sex: string;
   avatars: AvatarType[];
}

export const getAvatarUrl = ({ sex, avatars }: getAvatarUrlProps) => {
   if (avatars.length) {
      return `${Constants.backendUrl}/file/${avatars[0].path}`;
   }

   if (sex === 'Male') {
      return Male;
   }

   return Female;
};
