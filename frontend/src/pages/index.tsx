import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import { GetServerSideProps } from 'next';

import GlobalStyle from '../styles/GlobalStyle';

// import Home from '../components/dashboard';
import Login from '../components/Login';

import ContextProvider from '../context';

import { useAccounts, useUser } from '../hooks';

import { UserCompleteType } from '../context/types';
import api from '../services/api';
import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils';

// import { Container } from './styles';

interface Props {
   user: UserCompleteType;
   show: boolean;
}

const Pages: React.FC<Props> = ({ show }) => {
   const user = null;

   const [Show, setShow] = useState(show);
   const { isAuthenticated } = useUser();

   useEffect(() => {
      setShow(true);
   }, []);

   return (
      <ContextProvider>
         <Head>
            <title>{user ? 'Facebook' : 'Facebook – entre ou cadastre-se'}</title>
         </Head>

         {Show && (isAuthenticated ? <div /> : <Login />)}

         <GlobalStyle />
      </ContextProvider>
   );
};

export const getServerSideProps: GetServerSideProps = async context => {
   const cookies = context.req.cookies;

   let user: UserCompleteType | undefined = undefined;

   if (cookies) {
      if (cookies.user) {
         const parsedUser = JSON.parse(cookies.user);

         const response = await api.get(`/user/${parsedUser.id}`, {
            headers: {
               authorization: `Bearer ${parsedUser.token}`,
            },
         });

         user = response.data;
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
