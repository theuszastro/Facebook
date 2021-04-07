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

import Constants from '../utils/Constants';

import { ServerSideLoginErrors } from '../context/types';

// import { Container } from './styles';

interface Props {
   user: UserCompleteType;
   show: boolean;
   errors: ServerSideLoginErrors;
}

const Pages: React.FC<Props> = ({ show, errors }) => {
   const isSSR = process.browser;

   const user = null;

   const [Show, setShow] = useState(!isSSR ? show : false);
   const { isAuthenticated } = useUser();

   useEffect(() => {
      setShow(true);
   }, []);

   return (
      <ContextProvider Errors={errors}>
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

   let user: UserCompleteType | null = null;
   let errors: { email: boolean; password: boolean } | null = null;

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

      if (cookies.errors) {
         const parsedErrors = JSON.parse(cookies.errors);

         errors = parsedErrors;

         context.res.setHeader('Set-Cookie', `errors=; expires=${Constants.deleteCookie}`);
      }
   }

   return {
      props: {
         show: true,
         user,
         errors,
      },
   };
};

export default Pages;
