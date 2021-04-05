import React from 'react';

import { useHeader } from '../../../hooks';

import Header from '../Header';
import MenuLeft from '../MenuLeft';
import Feed from '../Feed';
import MenuRight from '../MenuRight';

import { Container, Fixed, Left, Center, Right, Intermediator } from './styles';

const Home: React.FC = () => {
   const { HeaderShowSearch, setHeaderShowSearch, OpenInput, setOpenInput } = useHeader();

   return (
      <>
         <Header />

         <Container
            onClick={() => {
               HeaderShowSearch && setHeaderShowSearch(false);
               OpenInput && setOpenInput(false);
            }}
         >
            <Fixed style={{ gridArea: 'ml' }}>
               <Left id="dashLeft">
                  <Intermediator>
                     <MenuLeft />
                  </Intermediator>
               </Left>
            </Fixed>

            <Center id="dashCenter">
               <Feed />
            </Center>

            <Fixed style={{ gridArea: 'mr' }}>
               <Right id="dashRight">
                  <Intermediator>
                     <MenuRight />
                  </Intermediator>
               </Right>
            </Fixed>
         </Container>
      </>
   );
};

export default Home;
