import React, { useState } from 'react';
import { useUser } from '../../hooks';
import { getAvatarUrl } from '../../utils/functions/User';

import { StoriesArray } from '../../utils/arrays/Stories';

import {
   Container,
   StoryEmpty,
   StoryEmptyContent,
   StoryEmptyWrapperIcon,
   Plus,
   StoryEmptyDetails,
   StoryEmptyTitle,
   StoryEmptyDescription,
   Stories,
   NewStory,
   NewStoreContent,
   UserAvatar,
   NewStoreContentFooter,
   NewStoreContentFooterWrapperIcon,
   NewStoryLabel,
   Story,
   StoryUser,
   StoryContent,
   StoryUserName,
} from './styles';

const StoriesComponent: React.FC = () => {
   const { User } = useUser();

   const [UserStories, setUserStories] = useState(StoriesArray);

   return (
      <Container>
         <Stories>
            {UserStories.map((item, index) => {
               if (index === 0) {
                  return (
                     <NewStory onClick={() => alert('ainda não feito')} key={index}>
                        <NewStoreContent>
                           <UserAvatar
                              src={getAvatarUrl({
                                 sex: User?.sex ?? 'Female',
                                 avatars: User?.avatars ?? [],
                              })}
                           />

                           <NewStoreContentFooter>
                              <NewStoreContentFooterWrapperIcon>
                                 <Plus />
                              </NewStoreContentFooterWrapperIcon>

                              <NewStoryLabel>Criar story</NewStoryLabel>
                           </NewStoreContentFooter>
                        </NewStoreContent>
                     </NewStory>
                  );
               }

               return (
                  <Story key={index} onClick={() => alert(`Story de ${item.name}`)}>
                     <StoryUser
                        src={item.avatar}
                        className={index % 2 === 0 ? 'active' : ''}
                     />

                     <StoryContent src={item.content} />

                     <StoryUserName>{item.name}</StoryUserName>
                  </Story>
               );
            })}
         </Stories>

         {/* <StoryEmpty onClick={() => alert('ainda não feito')}>
            <StoryEmptyContent>
               <StoryEmptyWrapperIcon>
                  <Plus />
               </StoryEmptyWrapperIcon>

               <StoryEmptyDetails>
                  <StoryEmptyTitle>Criar um story</StoryEmptyTitle>

                  <StoryEmptyDescription>
                     Compartilhe uma foto ou escreva algo.
                  </StoryEmptyDescription>
               </StoryEmptyDetails>
            </StoryEmptyContent>
         </StoryEmpty> */}
      </Container>
   );
};

export default StoriesComponent;
