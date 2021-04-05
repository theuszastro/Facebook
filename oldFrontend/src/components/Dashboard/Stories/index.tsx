import React, { useState, memo } from 'react';

import {
   Container,
   WrapperStory,
   NewStory,
   WrapperAvatar,
   UserAvatar,
   Circle,
   Plus,
   NewStoryLabel,
   Story,
   WrapperUserPhoto,
   UserPhoto,
   Content,
   UserName,
   MoreStories,
   Arrow,
   StoryEmpty,
   StoryEmptyContent,
   WrapperIcon,
   StoryEmptyInfo,
   Title,
   Description,
} from './styles';

interface Props {
   AvatarUrl: string;
}

const Stories: React.FC<Props> = ({ AvatarUrl }) => {
   const [AllStories, setAllStories] = useState([]);

   return (
      <Container>
         {AllStories.length ? (
            <WrapperStory>
               <NewStory>
                  <WrapperAvatar>
                     <UserAvatar src={AvatarUrl} />
                  </WrapperAvatar>

                  <Circle>
                     <Plus size={24} color="white" />
                  </Circle>

                  <NewStoryLabel>
                     Criar um <br />
                     story
                  </NewStoryLabel>
               </NewStory>

               {['', '', '', '', ''].map((_, index) => (
                  <Story
                     className={
                        (window.innerWidth <= 1200 && index === 3) || index === 4
                           ? `last-${index}`
                           : ''
                     }
                     key={index}
                  >
                     <WrapperUserPhoto>
                        <UserPhoto src="https://i.pinimg.com/originals/ca/76/0b/ca760b70976b52578da88e06973af542.jpg" />
                     </WrapperUserPhoto>

                     <Content src="https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg" />

                     <UserName>akdljawh ojkdalw</UserName>
                  </Story>
               ))}

               <MoreStories onClick={() => alert('Ainda não feito rs')}>
                  <Arrow size={18} />
               </MoreStories>
            </WrapperStory>
         ) : (
            <StoryEmpty onClick={() => alert('Ainda não feito rs')}>
               <StoryEmptyContent>
                  <WrapperIcon>
                     <Plus />
                  </WrapperIcon>

                  <StoryEmptyInfo>
                     <Title>Criar um story</Title>

                     <Description>Compartilhe uma foto ou escreva algo.</Description>
                  </StoryEmptyInfo>
               </StoryEmptyContent>
            </StoryEmpty>
         )}
      </Container>
   );
};

export default memo(Stories);
