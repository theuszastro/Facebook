import React, { useEffect } from 'react';

import { useHeader, useUser } from '../../hooks';

import Header from '../Header';
import Stories from '../Stories';

import { WrapperContainer, Container, Left, Center, Right } from './styles';

const Dashboard: React.FC = () => {
   const { User } = useUser();

   const { setHeaderMobile, setHeaderHamburger } = useHeader();

   function checkWidth() {
      setHeaderMobile(window.innerWidth <= 1260);

      setHeaderHamburger(window.innerWidth <= 700);
   }

   useEffect(() => {
      checkWidth();

      window.addEventListener('resize', checkWidth);

      return () => {
         window.removeEventListener('resize', checkWidth);
      };
   }, []);

   return (
      <WrapperContainer>
         <Header />

         <Container>
            <Left id="dashLeft">
               <div
                  style={{
                     width: '100%',
                     height: 'calc(100vh - 5.5rem)',
                     // background: 'yellow',
                  }}
               />
            </Left>

            <Center id="dashCenter">
               <Stories />
            </Center>

            <Right id="dashRight">
               <div
                  style={{
                     display: 'flex',
                     width: '100%',
                     height: 'calc(100vh - 5.5rem)',
                     // background: 'yellow',
                     justifyContent: 'flex-end',
                  }}
               />
            </Right>
         </Container>
      </WrapperContainer>
   );
};

export default Dashboard;
