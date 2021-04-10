import styled, { css } from 'styled-components';

import { HiPlus } from 'react-icons/hi';

export const Container = styled.div``;

export const StoryEmpty = styled.div`
   background: red;

   width: 100%;
   height: 8rem;

   border-radius: 1rem;

   background: ${props => props.theme.colors.primary};
`;

export const StoryEmptyContent = styled.div`
   width: 100%;
   height: 8rem;

   display: flex;
   align-items: center;

   position: relative;

   padding: 0.8rem 1rem;

   cursor: pointer;

   &:hover {
      &::before {
         content: '';

         border-radius: 1rem;

         width: calc(100% - 2rem);
         height: calc(100% - 2rem);

         background: rgba(255, 255, 255, 0.1);

         position: absolute;
      }
   }
`;

export const StoryEmptyWrapperIcon = styled.div`
   width: 4rem;
   height: 4rem;

   border-radius: 50%;

   margin-left: 1rem;

   display: flex;
   align-items: center;
   justify-content: center;

   background-color: ${props => (props.theme.title === 'light' ? '#E7F3FF' : '#2D88FF33')};

   & > svg {
      width: 3rem;
      height: 3rem;

      fill: ${props => props.theme.colors.blue_two};
   }
`;

export const Plus = styled(HiPlus)``;

export const StoryEmptyDetails = styled.div`
   margin-left: 1rem;

   display: flex;
   align-items: flex-start;
   justify-content: space-between;

   flex-direction: column;
`;

export const StoryEmptyTitle = styled.p`
   font-size: 1.7rem;
   font-weight: 800;

   margin-bottom: 0.2rem;

   color: ${props => props.theme.colors.label};
`;

export const StoryEmptyDescription = styled.p`
   font-size: 1.5rem;

   color: ${props => props.theme.colors.gray};
`;

export const Stories = styled.div`
   width: 100%;
   height: 20rem;

   display: flex;
`;

const StoryCss = css`
   width: calc(100% / 5);
   height: 20rem;

   overflow: hidden;

   position: relative;

   border-radius: 1rem;

   cursor: pointer;

   background: ${props => props.theme.colors.primary};
`;

export const NewStory = styled.div`
   ${StoryCss};

   margin-right: 1rem;
`;

export const NewStoreContent = styled.div`
   width: 100%;
   height: 100%;
`;

export const UserAvatar = styled.img`
   width: 100%;
   height: 75%;

   object-fit: cover;
`;

export const NewStoreContentFooter = styled.div`
   height: 25%;

   position: relative;

   display: flex;
   align-items: center;
   justify-content: center;
`;

export const NewStoreContentFooterWrapperIcon = styled.div`
   width: 4rem;
   height: 4rem;

   display: flex;
   align-items: center;
   justify-content: center;

   background: ${props => props.theme.colors.blue};

   border: 0.5rem solid ${props => props.theme.colors.primary};
   border-radius: 50%;

   position: absolute;
   top: -40%;

   & > svg {
      width: 2.5rem;
      height: 2.5rem;

      fill: ${props => props.theme.colors.label};
   }
`;

export const NewStoryLabel = styled.p`
   position: absolute;
   bottom: 1.3rem;

   font-size: 1.5rem;
   font-weight: bold;

   color: ${props => props.theme.colors.label};
`;

export const Story = styled.div`
   ${StoryCss};

   margin-right: 1rem;

   &:last-child {
      margin: 0;
   }
`;

export const StoryUser = styled.img`
   width: 4rem;
   height: 4rem;

   position: absolute;
   top: 1rem;
   left: 1rem;

   object-fit: cover;

   border-radius: 50%;

   border: 0.4rem solid ${props => props.theme.colors.gray_two};

   &.active {
      border: 0.4rem solid ${props => props.theme.colors.blue_two};
   }
`;

export const StoryContent = styled.img`
   width: 100%;
   height: 100%;

   object-fit: cover;
`;

export const StoryUserName = styled.p`
   position: absolute;
   bottom: 1rem;

   padding: 0 1rem;

   font-size: 1.4rem;
   font-weight: bold;

   color: ${props => props.theme.colors.label};
`;
