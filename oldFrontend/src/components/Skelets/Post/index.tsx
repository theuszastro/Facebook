import React from 'react';

import {
   Container,
   WrapperAuthor,
   Avatar,
   Author,
   AuthorName,
   Datetime,
   WrapperActions,
   Actions,
   Action,
} from './styles';

const PostagemEffect: React.FC = () => {
   return (
      <Container>
         <WrapperAuthor>
            <Avatar />

            <Author>
               <AuthorName />
               <Datetime />
            </Author>
         </WrapperAuthor>

         <WrapperActions>
            <Actions>
               <Action />

               <Action />

               <Action />
            </Actions>
         </WrapperActions>
      </Container>
   );
};

export default PostagemEffect;
