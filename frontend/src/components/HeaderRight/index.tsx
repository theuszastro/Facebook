import React from 'react';

import { FaFacebookMessenger } from 'react-icons/fa';

import { getAvatarUrl } from '../../utils/functions/User';
import Bell from '../../assets/svgs/bell';

import { usePopup, useUser } from '../../hooks';

import {
   Container,
   CurrentUser,
   CurrentUserAvatar,
   CurrentUserName,
   Actions,
   Action,
   ActionIcon,
} from './styles';

interface Props {
   isHeader?: boolean;
}

const HeaderRight: React.FC<Props> = ({ isHeader = true }) => {
   const { User, setUser } = useUser();

   const { ShowPopup } = usePopup();

   if (isHeader && ShowPopup) return <Container />;

   return (
      <Container>
         <CurrentUser onClick={() => alert('ainda não feito')}>
            <CurrentUserAvatar
               src={getAvatarUrl({
                  sex: User?.sex ?? 'Male',
                  avatars: User?.avatars ?? [],
               })}
            />

            <CurrentUserName>
               {User?.firstname} {User?.lastname}
            </CurrentUserName>
         </CurrentUser>

         <Actions>
            <Action
               onClick={() => {
                  if (User) {
                     let theme = User.theme === 'dark' ? 'light' : 'dark';

                     setUser({
                        ...User,
                        theme,
                     });
                  }
               }}
            >
               <ActionIcon className="plus" />
            </Action>

            <Action onClick={() => alert('ainda não feito')}>
               <FaFacebookMessenger size={18} />
            </Action>

            <Action onClick={() => alert('ainda não feito')}>
               <Bell />
            </Action>

            <Action onClick={() => alert('ainda não feito')}>
               <ActionIcon className="down" />
            </Action>
         </Actions>
      </Container>
   );
};

export default HeaderRight;
