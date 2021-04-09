import React, { useEffect } from 'react';

import { useHeader, useUser } from '../../hooks';
import Header from '../Header';

import { WrapperContainer, Container, Left, Center, Right, Intermediator } from './styles';

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
                     background: 'yellow',
                  }}
               />
            </Left>

            <Center id="dashCenter">
               {/* <Feed /> */}

               {[0, 1, 2, 3, 4, 5, 6, 7].map(item => {
                  return (
                     <div
                        key={item}
                        style={{
                           width: '100%',
                           height: '50vh',
                           background: 'blue',
                           ...(item != 0 && { marginTop: '1rem' }),
                        }}
                     />
                  );
               })}
            </Center>

            <Right id="dashRight">
               <div
                  style={{
                     display: 'flex',
                     width: '100%',
                     height: 'calc(100vh - 5.5rem)',
                     background: 'yellow',
                     justifyContent: 'flex-end',
                  }}
               />
            </Right>
         </Container>
      </WrapperContainer>
   );
};

export default Dashboard;
