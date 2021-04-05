import React, { useState, useMemo, useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

import dayjs from 'dayjs';

import { useLogin, useHeader, useTheme } from '../../../hooks';
import { SearchedHistoricType } from '../../../context/types';

import LogoImage from '../../../assets/shortLogo.png';
import { getAvatarUrl } from '../../../utils/functions/Avatar';

import HomeActive from '../../../assets/svgs/fill/home';
import HomeDesactive from '../../../assets/svgs/outline/home';
import PageActive from '../../../assets/svgs/fill/flag';
import PageDesactive from '../../../assets/svgs/outline/flag';
import WatchActive from '../../../assets/svgs/fill/tv';
import WatchDesactive from '../../../assets/svgs/outline/tv';
import MarketActive from '../../../assets/svgs/fill/market';
import MarketDesactive from '../../../assets/svgs/outline/market';
import GroupActive from '../../../assets/svgs/fill/groups';
import GroupDesactive from '../../../assets/svgs/outline/groups';

import Bell from '../../../assets/svgs/bell';

import socket from '../../../services/socket';

import {
   Container,
   Left,
   ResultsSearchred,
   SearchBox,
   Back,
   BackIcon,
   Logo,
   WrapperInput,
   SearchIcon,
   SearchInput,
   Center,
   Tab,
   TabItem,
   Right,
   CurrentUser,
   Avatar,
   Username,
   BackgroundIcon,
   Icon,
   NewIcon,
   Messenger,
   Settings,
   ResultsHeader,
   ResultsMain,
   EmptyResults,
   EmptyResultsLabel,
   HistoricWrapper,
   SearchedUser,
   SearchedAvatar,
   WrapperUserSearched,
   SearchedUserName,
   Friend,
   WrapperIcon,
   Clock,
   HistoricLabel,
   Row,
   RowLabel,
   WrapperEditRecent,
   EditRecent,
} from './styles';

const Header: React.FC = () => {
   const {
      HeaderShowSearch,
      setHeaderShowSearch,
      OpenInput,
      setOpenInput,
      HeaderMobile,
      setHeaderMobile,
   } = useHeader();
   const { User, Accounts, setAccounts } = useLogin();
   const { Theme, setTheme } = useTheme();

   const router = useRouter();

   const AvatarUrl = useMemo(() => getAvatarUrl(User), []);
   const SearchRef = useRef<HTMLInputElement>(null);
   const DebounceRef = useRef({ timeout: 0 });

   const [Focused, setFocused] = useState(false);
   const [SearchedHistoric, setSearchedHistoric] = useState<SearchedHistoricType[]>([]);

   const [ShowUserHistoric, setShowUserHistoric] = useState(false);
   const [ShowSearchedHistoric, setShowSearchedHistoric] = useState(false);
   const [ShowEmptyHistoric, setShowEmptyHistoric] = useState(false);

   const [SearchInputValue, setSearchInputValue] = useState('');
   const [TabsActives, setTabsActives] = useState({
      home: true,
      pages: false,
      watch: false,
      market: false,
      groups: false,
   });

   function updateTabs(key: string) {
      const newActiveObject = {} as any;

      Object.entries(TabsActives).map(item => (newActiveObject[item[0]] = false));

      newActiveObject[key] = true;

      setTabsActives(newActiveObject);
   }

   function renderHistorics(item: SearchedHistoricType, index: number) {
      if (item.isUser && item.user) {
         const { id, firstname, lastname, sex } = item.user;
         const Avatar = getAvatarUrl(item.user);

         return (
            <SearchedUser
               key={`${item.user.id}-${index}`}
               onClick={() => {
                  socket.emit('createHistoric', {
                     search: '',
                     user: User.id,
                     searchedUser: id,
                  });
               }}
            >
               <SearchedAvatar src={Avatar} />

               <WrapperUserSearched>
                  <SearchedUserName>
                     {firstname} {lastname}
                  </SearchedUserName>

                  <Friend>{sex === 'Masculino' ? 'Amigo' : 'Amiga'}</Friend>
               </WrapperUserSearched>
            </SearchedUser>
         );
      }

      if (item.isHistoric && item.historic) {
         const { id, query } = item.historic;

         return (
            <HistoricWrapper key={`${id}-${index}`}>
               <WrapperIcon>
                  <Clock size={20} />
               </WrapperIcon>

               <HistoricLabel>{query}</HistoricLabel>
            </HistoricWrapper>
         );
      }
   }

   async function changeTheme() {
      const newTheme = Theme === 'light' ? 'dark' : 'light';

      setTheme(newTheme);

      socket.emit('theme', { user: User.id, theme: newTheme });
   }

   async function Logoff() {
      const { id, firstname, lastname, sex, email, phone, avatars } = User;

      const position = email
         ? Accounts.findIndex(ac => ac.email === email)
         : Accounts.findIndex(ac => ac.phone === phone);

      if (position != -1) {
         Accounts.splice(position, 1);

         setAccounts([...Accounts]);
      }

      const latestAvatar = avatars.splice(0, 1);

      Accounts.push({
         id,
         firstname,
         lastname,
         sex,
         email: email ? email : '',
         phone: phone ? phone : '',
         avatars: latestAvatar,
         password: '',
      });

      const expires = new Date(dayjs().add(100, 'year').format());
      document.cookie = ` accounts=${JSON.stringify(
         Accounts.reverse()
      )}; expires=${expires.toUTCString()}
      `;
      document.cookie = `user=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

      router.reload();
   }

   useEffect(() => {
      setHeaderMobile(window.innerWidth <= 1300);
   }, []);

   useEffect(() => {
      if (SearchInputValue.length) {
         clearTimeout(DebounceRef.current.timeout);

         DebounceRef.current.timeout = setTimeout(() => {
            socket.emit('findByQuery', { query: SearchInputValue, user: User.id });
         }, 500);
      } else {
         SearchedHistoric.length >= 1 && setSearchedHistoric([]);
      }
   }, [SearchInputValue]);

   useEffect(() => {
      function reset() {
         ShowUserHistoric && setShowUserHistoric(false);
         ShowSearchedHistoric && setShowSearchedHistoric(false);
         ShowEmptyHistoric && setShowEmptyHistoric(false);
      }

      if (User.historic.length <= 0 && SearchInputValue.length === 0) {
         reset();

         setShowEmptyHistoric(true);
      }

      if (SearchInputValue.length >= 1 && SearchedHistoric.length >= 1) {
         reset();

         setShowSearchedHistoric(true);
      }

      if (User.historic.length >= 1 && SearchInputValue.length === 0) {
         reset();

         setShowUserHistoric(true);
      }
   }, [User, SearchInputValue, SearchedHistoric]);

   useEffect(() => {
      socket.removeEventListener('resultHistoric');

      socket.on('resultHistoric', (data: SearchedHistoricType[]) =>
         setSearchedHistoric([...data])
      );
   }, [SearchedHistoric]);

   return (
      <Container
         onClick={() => {
            HeaderShowSearch && setHeaderShowSearch(false);
            OpenInput && setOpenInput(false);
         }}
      >
         <div
            style={{
               width: '98%',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'space-between',
            }}
         >
            <Left onClick={e => e.stopPropagation()} className={HeaderMobile ? 'mobile' : ''}>
               <SearchBox>
                  <Logo src={LogoImage} />

                  <WrapperInput
                     onClick={e => {
                        if (OpenInput) {
                           return;
                        }

                        setHeaderShowSearch(true);
                        setOpenInput(true);

                        setTimeout(() => {
                           SearchRef.current?.focus();
                        }, 100);
                     }}
                     Focused={Focused}
                     OpenInput={OpenInput}
                     className={HeaderMobile ? 'mobile' : ''}
                  >
                     {(!Focused && <SearchIcon size={16} />) ||
                        (HeaderMobile && <SearchIcon size={16} />)}

                     <SearchInput
                        autoComplete="off"
                        placeholder="Pesquisar no Facebook"
                        value={SearchInputValue}
                        onChange={() => {}}
                        onFocus={() => {
                           setFocused(true);

                           setHeaderShowSearch(true);
                        }}
                        onBlur={() => setFocused(false)}
                     />
                  </WrapperInput>
               </SearchBox>

               {HeaderShowSearch && (
                  <ResultsSearchred>
                     <ResultsHeader
                        style={{
                           marginBottom:
                              User.historic.length && ShowUserHistoric ? '2.5rem' : '0.5rem',
                        }}
                     >
                        <Back>
                           <BackIcon size={17} />
                        </Back>

                        <WrapperInput Focused={Focused} OpenInput={false}>
                           {!Focused && <SearchIcon size={16} />}

                           <SearchInput
                              autoFocus
                              ref={SearchRef}
                              value={SearchInputValue}
                              onChange={e => setSearchInputValue(e.target.value)}
                              autoComplete="off"
                              className={!Focused ? 'extend focused' : 'extend'}
                              placeholder="Pesquisar no Facebook"
                              onFocus={() => setFocused(true)}
                              onBlur={() => setFocused(false)}
                              onKeyPress={e => {
                                 if (e.key === 'Enter') {
                                    socket.emit('createHistoric', {
                                       search: SearchInputValue,
                                       user: User.id,
                                    });
                                 }
                              }}
                           />
                        </WrapperInput>
                     </ResultsHeader>

                     <ResultsMain>
                        {ShowEmptyHistoric && (
                           <EmptyResults>
                              <EmptyResultsLabel>Nenhuma pesquisa recente</EmptyResultsLabel>
                           </EmptyResults>
                        )}

                        {ShowUserHistoric && (
                           <Row>
                              <RowLabel>Pesquisas Recentes</RowLabel>

                              <WrapperEditRecent>
                                 <EditRecent>Editar</EditRecent>
                              </WrapperEditRecent>
                           </Row>
                        )}

                        {ShowUserHistoric &&
                           User.historic.map((item, index) => renderHistorics(item, index))}

                        {ShowSearchedHistoric &&
                           SearchedHistoric.map((item, index) => renderHistorics(item, index))}
                     </ResultsMain>
                  </ResultsSearchred>
               )}
            </Left>

            <Center>
               <Tab
                  className={TabsActives.home ? 'active' : ''}
                  onClick={() => updateTabs('home')}
               >
                  <TabItem className={TabsActives.home ? 'active' : ''}>
                     {TabsActives.home ? <HomeActive /> : <HomeDesactive />}
                  </TabItem>
               </Tab>

               <Tab
                  className={TabsActives.pages ? 'active' : ''}
                  onClick={() => updateTabs('pages')}
               >
                  <TabItem className={TabsActives.pages ? 'active' : ''}>
                     {TabsActives.pages ? <PageActive /> : <PageDesactive />}
                  </TabItem>
               </Tab>

               <Tab
                  className={TabsActives.watch ? 'active' : ''}
                  onClick={() => updateTabs('watch')}
               >
                  <TabItem className={TabsActives.watch ? 'active' : ''}>
                     {TabsActives.watch ? <WatchActive /> : <WatchDesactive />}
                  </TabItem>
               </Tab>

               <Tab
                  className={TabsActives.market ? 'active' : ''}
                  onClick={() => updateTabs('market')}
               >
                  <TabItem className={TabsActives.market ? 'active' : ''}>
                     {TabsActives.market ? <MarketActive /> : <MarketDesactive />}
                  </TabItem>
               </Tab>

               <Tab
                  className={TabsActives.groups ? 'active' : ''}
                  onClick={() => updateTabs('groups')}
               >
                  <TabItem className={TabsActives.groups ? 'active' : ''}>
                     {TabsActives.groups ? <GroupActive /> : <GroupDesactive />}
                  </TabItem>
               </Tab>
            </Center>

            <Right>
               <CurrentUser>
                  <Avatar src={AvatarUrl} />

                  <Username>{User.firstname}</Username>
               </CurrentUser>

               <div
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                  }}
               >
                  <BackgroundIcon onClick={changeTheme}>
                     <Icon>
                        <NewIcon size={20} />
                     </Icon>
                  </BackgroundIcon>

                  <BackgroundIcon>
                     <Icon>
                        <Messenger size={18} />
                     </Icon>
                  </BackgroundIcon>

                  <BackgroundIcon>
                     <Icon>
                        <Bell />
                     </Icon>
                  </BackgroundIcon>

                  <BackgroundIcon onClick={Logoff}>
                     <Icon>
                        <Settings size={20} />
                     </Icon>
                  </BackgroundIcon>
               </div>
            </Right>
         </div>
      </Container>
   );
};

export default Header;
