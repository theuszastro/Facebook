import React from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';

import ContextProvider from '../context';

import GlobalStyle from '../styles/GlobalStyle';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
   return (
      <ContextProvider>
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

export default MyApp;
