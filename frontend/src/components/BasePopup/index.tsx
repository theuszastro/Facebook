import React from 'react';

import HeaderLeft from '../HeaderLeft';
import HeaderRight from '../HeaderRight';
import CreatePostPopup from '../CreatePostPopup';

import { Container, HeaderSpace, Row, Main } from './styles';

const BasePopup: React.FC = () => {
   return (
      <Container>
         <Row>
            <HeaderLeft />

            <HeaderSpace />

            <HeaderRight isHeader={false} />
         </Row>

         <Main>
            <CreatePostPopup />
         </Main>
      </Container>
   );
};

export default BasePopup;
