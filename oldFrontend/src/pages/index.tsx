import React, { useState, useEffect } from 'react';

import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { ThemeProvider } from 'styled-components';

import dayjs from 'dayjs';
import ptbr from 'dayjs/locale/pt-br';

import {
   UserCompleteType,
   FriendType,
   PostsType,
   updateLikesSocket,
   updateSharesSocket,
   RememberType,
   AccountsType,
   AvatarType,
   SearchedHistoricType,
} from '../context/types';
import { useLogin, useTheme, useHeader, useSocket } from '../hooks';

import { Dark, Light } from '../styles/theme';

import Login from '../components/Login';
import Home from '../components/Dashboard/Home';

import api from '../services/api';
import socket from '../services/socket';

import { Container } from '../styles/pages';

interface Props {
   backendOff: boolean;
   manyRequests: boolean;
   user: UserCompleteType | undefined;
   accounts: AccountsType[];
   remember: RememberType[];
}

dayjs.locale(ptbr);

const Pages: React.FC<Props> = ({ user, accounts, remember, backendOff, manyRequests }) => {
   const {
      isAuthenticated,
      setIsAuthenticated,
      setAccounts,
      setRemember,
      setUser,
      User,
   } = useLogin();

   const { Posts, setPosts, setTotalPage, TotalPage, setActualPage, ActualPage } = useSocket();
   const { setHeaderMobile } = useHeader();
   const { Theme, setTheme } = useTheme();

   const [Show, setShow] = useState(false);

   function onScroll() {
      const scrollTop = document.body.scrollTop;
      const height = document.body.scrollHeight - document.body.clientHeight;

      const amountScrolled = scrollTop / height;

      if (amountScrolled >= 0.7 && TotalPage > ActualPage) {
         socket.emit('feedByPage', { userId: User.id, page: ActualPage + 1 });

         setActualPage(ActualPage + 1);
      }
   }

   function updateUser(friends: FriendType[]) {
      setUser({
         ...User,
         friends: [...User.friends, ...friends],
      });
   }

   function updateUserHistoric(historics: SearchedHistoricType[], isNew = false) {
      const newHistoric: SearchedHistoricType[] = [];
      let historic: SearchedHistoricType[] = [];

      const max = 10;

      if (isNew) {
         const index = User.historic.findIndex(
            hs => hs.historic?.query === historics[0].historic?.query
         );

         if (index != -1) {
            User.historic.splice(index, 1);
         }

         if (User.historic.length >= max) {
            const total = User.historic.length - historics.length;

            User.historic.map((item, index) => {
               if (index >= total) {
                  return;
               }

               newHistoric.push(item);
            });

            historic = [...historics, ...newHistoric];
         } else {
            const total = historics.length + User.historic.length;

            if (total > max) {
               User.historic.map((item, index) => {
                  if (index >= total - max) {
                     return;
                  }

                  newHistoric.push(item);
               });

               historic = [...historics, ...newHistoric];

               return;
            }

            historic = [...historics, ...User.historic];
         }
      }

      setUser({
         ...User,
         ...(isNew ? { historic } : { historic: historics }),
      });
   }

   function updateStates(data: { page: number; feed: PostsType[]; totalPage: number }) {
      setActualPage(data.page);
      setPosts([...Posts, ...data.feed]);
      setTotalPage(data.totalPage);

      if (!isAuthenticated && !Show) {
         setIsAuthenticated(true);
         setShow(true);
      }
   }

   async function updateLikes({ post, reactions }: updateLikesSocket) {
      const PostIndex = Posts.findIndex(po => po.id === post);

      if (PostIndex != -1) {
         Posts[PostIndex].feedback.reactions = reactions;

         setPosts([...Posts]);
      }
   }

   async function updateShares({ id, shares }: updateSharesSocket) {
      const ShareIndex = Posts.findIndex(sh => sh.id === id);

      if (ShareIndex != -1) {
         Posts[ShareIndex].feedback.shares = shares;

         setPosts([...Posts]);
      }
   }

   useEffect(() => {
      window.onresize = function () {
         setHeaderMobile(window.innerWidth <= 1300);
      };
   }, []);

   useEffect(() => {
      document.body.removeEventListener('scroll', onScroll);

      if (TotalPage > ActualPage) {
         document.body.addEventListener('scroll', onScroll);
      }

      return () => document.body.removeEventListener('scroll', onScroll);
   }, [ActualPage, TotalPage]);

   useEffect(() => {
      socket.removeEventListener('solicitations');
      socket.removeEventListener('friends');
      socket.removeEventListener('userHistoric');
      socket.removeEventListener('newHistoric');

      socket.on('solicitations', (data: any) => console.log(data));
      socket.on('friends', (data: FriendType[]) => updateUser(data));
      socket.on('userHistoric', (data: SearchedHistoricType[]) => updateUserHistoric(data));
      socket.on('newHistoric', (data: SearchedHistoricType[]) =>
         updateUserHistoric(data, true)
      );
   }, [User]);

   useEffect(() => {
      // event => userHistoric, resultHistoric, newHistoric,
      // emit => createHistoric, findByQuery

      socket.removeEventListener('feed');
      socket.removeEventListener('updateLikes');
      socket.removeEventListener('updateShares');

      socket.on('feed', (data: any) => updateStates(data));
      socket.on('updateLikes', (data: updateLikesSocket) => updateLikes(data));
      socket.on('updateShares', (data: updateSharesSocket) => updateShares(data));
   }, [Posts]);

   useEffect(() => {
      if (backendOff) {
         alert('backend está off');

         return;
      }

      if (manyRequests) {
         alert('possivel ddos ou brute force previnido!');

         return;
      }

      if (accounts.length) {
         setAccounts([...accounts]);
      }

      if (remember.length) {
         setRemember([...remember]);
      }

      if (user) {
         setUser({
            ...user,
            avatars: [],
            friends: [],
            historic: [],
         });
         setTheme(user.theme);

         setIsAuthenticated(true);
         setShow(true);
         // socket.emit('userinfo', { userId: user.id });
      } else {
         setShow(true);
      }
   }, [user, accounts, remember, backendOff, manyRequests]);

   return (
      <ThemeProvider theme={Theme === 'light' ? Light : Dark}>
         <Head>
            <title>{user ? 'Facebook' : 'Facebook – entre ou cadastre-se'}</title>
         </Head>

         <Container>{Show && (isAuthenticated ? <Home /> : <Login />)}</Container>
      </ThemeProvider>
   );
};

export const getServerSideProps: GetServerSideProps = async context => {
   const cookies = context.req.cookies;

   let user: UserCompleteType | undefined = undefined;
   let manyRequests = false;
   let backendOff = false;

   let accounts: AccountsType[] = [];
   let remember: RememberType[] = [];

   if (cookies) {
      if (cookies.accounts) {
         accounts = JSON.parse(cookies.accounts);
      }

      if (cookies.remember) {
         remember = JSON.parse(cookies.remember);
      }

      if (cookies.user) {
         const { id, token } = JSON.parse(cookies.user);

         try {
            const response = await api.get(`/user/${id}`, {
               headers: {
                  authorization: `Bearer ${token}`,
               },
            });

            const User = response.data;

            user = User;
         } catch (err) {
            if (!err.response) {
               backendOff = true;
            } else {
               if (!err.response.data.err) {
                  switch (err.response.data) {
                     case 'Too many requests, please try again later.':
                        manyRequests = true;

                        break;
                  }
               }

               switch (err.response.data.error) {
                  case 'Token invalido/expirado':
                     context.res.setHeader(
                        'Set-Cookie',
                        'user=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
                     );

                     break;

                  case 'É necessario fazer login':
                     context.res.setHeader(
                        'Set-Cookie',
                        'user=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
                     );

                     break;
               }
            }
         }
      }
   }

   return {
      props: {
         ...(user && { user }),
         backendOff,
         manyRequests,
         accounts,
         remember,
      },
   };
};

export default Pages;
