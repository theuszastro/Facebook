import React from 'react';

import { AppProps } from 'next/app';
import { GetServerSideProps } from 'next';

import Head from 'next/head';

import ContextProvider from '../context';

import GlobalStyle from '../styles/GlobalStyle';

import Constants from '../utils/Constants';
import { ServerSideLoginErrors } from '../context/types';

interface Props extends AppProps {
   Errors: ServerSideLoginErrors | undefined;
}

const MyApp: React.FC<Props> = ({ Component, pageProps, Errors }) => {
   return (
      <ContextProvider Errors={Errors}>
         <Head>
            <link
               rel="shortcut icon"
               href="https://static.xx.fbcdn.net/rsrc.php/yD/r/d4ZIVX-5C-b.ico"
               type="image/x-icon"
            />

            <link rel="preconnect" href="https://fonts.gstatic.com" />
         </Head>

         <Component {...pageProps} />

         <GlobalStyle />
      </ContextProvider>
   );
};

export const getServerSideProps: GetServerSideProps = async context => {
   const cookies = context.req.cookies;

   let errors: ServerSideLoginErrors | null = null;

   if (cookies) {
      if (cookies.errors) {
         const parsedErrors = JSON.parse(cookies.errors);

         errors = parsedErrors;

         context.res.setHeader('Set-Cookie', `errors=; expires=${Constants.deleteCookie}`);
      }
   }

   return {
      props: {
         errors,
      },
   };
};

export default MyApp;
