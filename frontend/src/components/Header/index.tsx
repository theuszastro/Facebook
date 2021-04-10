import React, { useState } from 'react';

import { AiOutlineMenu, AiOutlinePlus, AiFillCaretDown } from 'react-icons/ai';
import { FaFacebookMessenger } from 'react-icons/fa';

import Logo from '../../assets/shortLogo.png';

import { Tabs } from '../../utils/arrays/Header';
import { getAvatarUrl } from '../../utils/functions/User';

import { useHeader, useUser } from '../../hooks';

import Bell from '../../assets/svgs/bell';

import {
   Container,
   Left,
   LogoImage,
   WrapperSearchInput,
   SearchInput,
   SearchIcon,
   Center,
   Right,
   PageTabs,
   PageTab,
   PageTabMain,
   PageTabHover,
   Actions,
   Action,
   CurrentUser,
   CurrentUserAvatar,
   CurrentUserName,
   ElementHover,
} from './styles';

const Header: React.FC = () => {
   const [TabsStates, setTabsStates] = useState(Tabs);

   const { HeaderMobile, HeaderHamburger } = useHeader();
   const { User } = useUser();

   function updateTabs(position: number) {
      TabsStates.map((item, index) => {
         if (item.active) {
            item.active = false;
         }

         if (index === position) {
            item.active = true;
         }
      });

      setTabsStates([...TabsStates]);
   }

   return (
      <Container>
         <Left className={HeaderMobile ? 'mobile' : ''}>
            <LogoImage src={Logo} />

            <WrapperSearchInput>
               <SearchIcon size={17} />

               {!HeaderMobile && <SearchInput placeholder="Pesquisar no Facebook" />}
            </WrapperSearchInput>

            {HeaderHamburger && (
               <PageTab
                  key={Math.random() * TabsStates.length}
                  className="hamburger"
                  onClick={() => alert('ainda não feito')}
               >
                  <PageTabMain>
                     <AiOutlineMenu size={28} />
                  </PageTabMain>

                  <PageTabHover />
               </PageTab>
            )}
         </Left>

         {!HeaderHamburger && (
            <Center>
               <PageTabs>
                  {TabsStates.map((item, index) => {
                     return (
                        <PageTab
                           onClick={() => updateTabs(index)}
                           key={Math.random() * TabsStates.length}
                           className={item.active ? `active ` : ''}
                        >
                           <PageTabMain>
                              {item.active ? item.activeImage : item.desactiveImage}
                           </PageTabMain>

                           <PageTabHover />
                        </PageTab>
                     );
                  })}
               </PageTabs>
            </Center>
         )}

         <Right>
            <CurrentUser>
               <CurrentUserAvatar
                  onClick={() => alert('ainda não feito')}
                  src={getAvatarUrl({
                     sex: User?.sex ?? 'Male',
                     avatars: User?.avatars ?? [],
                  })}
               />

               <CurrentUserName>
                  {User?.firstname} {User?.lastname}
               </CurrentUserName>

               <ElementHover />
            </CurrentUser>

            <Actions>
               <Action onClick={() => alert('ainda não feito')}>
                  <AiOutlinePlus size={20} />

                  <ElementHover />
               </Action>

               <Action onClick={() => alert('ainda não feito')}>
                  <FaFacebookMessenger size={18} />

                  <ElementHover />
               </Action>

               <Action onClick={() => alert('ainda não feito')}>
                  <Bell />

                  <ElementHover />
               </Action>

               <Action onClick={() => alert('ainda não feito')}>
                  <AiFillCaretDown size={20} />

                  <ElementHover />
               </Action>
            </Actions>
         </Right>
      </Container>
   );
};

export default Header;
