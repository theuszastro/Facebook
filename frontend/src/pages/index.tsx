import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { ThemeProvider } from 'styled-components';
import { Light, Dark } from '../styles/theme';

import Login from '../components/Login';
import Dashboard from '../components/Dashboard';

import { useAccounts, useUser } from '../hooks';

import { UserCompleteType } from '../context/types';
import api from '../services/api';

import { Container } from '../styles/pages';
import Constants from '../utils/Constants';

interface Props {
   user: UserCompleteType;
   show: boolean;
}

const Pages: React.FC<Props> = ({ show, user }) => {
   const [Show, setShow] = useState(typeof window === 'undefined' ? show : false);
   const { isAuthenticated, setIsAuthenticated, setUser, User } = useUser();

   useEffect(() => {
      if (user) {
         setUser(user);

         setIsAuthenticated(true);
      }

      setShow(true);
   }, []);

   return (
      <ThemeProvider theme={User ? (User.theme === 'dark' ? Light : Dark) : Light}>
         <Head>
            <title>{user ? 'Facebook' : 'Facebook – entre ou cadastre-se'}</title>
         </Head>

         {Show && <Container>{isAuthenticated ? <Dashboard /> : <Login />}</Container>}
      </ThemeProvider>
   );
};

export const getServerSideProps: GetServerSideProps = async context => {
   const cookies = context.req.cookies;

   let user: UserCompleteType | null = null;

   if (cookies) {
      if (cookies.user) {
         try {
            const parsedUser = JSON.parse(cookies.user);

            const response = await api.get(`/user/${parsedUser.id}`, {
               headers: {
                  authorization: `Bearer ${parsedUser.token}`,
               },
            });

            user = response.data;
            user.token = parsedUser.token;
         } catch (err) {
            context.res.setHeader(
               'Set-Cookie',
               `user=; expires=${Constants.deleteCookie}; path=/`
            );
         }
      }
   }

   return {
      props: {
         show: true,
         user,
      },
   };
};

export default Pages;
