import styled from 'styled-components';

import { ImArrowRight2 } from 'react-icons/im';
import { HiPlus } from 'react-icons/hi';

export const Container = styled.div``;

export const WrapperStory = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;

   position: relative;

   @media (max-width: 700px) {
      margin-top: 2rem;
   }
`;

export const NewStory = styled.div`
   width: 11.11rem;
   height: 20rem;

   position: relative;

   border-radius: 1rem;

   flex-shrink: 0;

   cursor: pointer;

   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;

   background-color: ${props => props.theme.colors.primary};

   overflow: hidden;

   &:hover {
      &::before {
         content: '';

         width: 100%;
         height: 100%;

         position: absolute;
         top: 0;
         left: 0;

         border-radius: 1rem;

         z-index: 4;

         background-color: rgba(0, 0, 0, 0.1);
      }

      & > div > img {
         transform: scale(1.02);
      }
   }

   @media (max-width: 1100px) {
      width: 11.11rem;
   }

   @media (max-width: 1000px) {
      width: 12.1rem;
   }

   @media (max-width: 800px) {
      width: 10.6rem;
   }

   @media (max-width: 700px) {
      width: 12rem;
   }

   @media (max-width: 650px) {
      width: calc(100% / 5 - 1rem);
   }

   @media (max-width: 600px) {
      width: calc(100% / 4 - 0.9rem);
   }
`;

export const WrapperAvatar = styled.div`
   width: 100%;
   height: 13rem;

   transition: 400ms;

   overflow: hidden;

   position: absolute;
   top: 0;
   left: 0;

   z-index: 2;
`;

export const UserAvatar = styled.img`
   width: 100%;
   height: 13rem;

   object-fit: cover;

   border-top-left-radius: 1rem;
   border-top-right-radius: 1rem;
`;

export const Circle = styled.div`
   width: 3.8rem;
   height: 3.8rem;

   border: 3px solid ${props => props.theme.colors.primary};

   border-radius: 50%;

   display: flex;
   align-items: center;
   justify-content: center;

   position: relative;
   top: 3rem;
   z-index: 3;

   background-color: ${props => props.theme.colors.blue};
`;

export const Plus = styled(HiPlus)``;

export const NewStoryLabel = styled.p`
   position: absolute;
   bottom: 1.25rem;

   font-size: 1.4rem;
   font-weight: bold;

   text-align: center;

   color: ${props =>
      props.theme.title === 'light' ? '#000' : 'rgba(255, 255, 255, .9)'};
`;

export const Story = styled.div`
   width: 11.11rem;
   height: 20rem;

   flex-shrink: 0;

   position: relative;

   border-radius: 1rem;

   background-color: ${props => props.theme.colors.primary};

   margin-left: 1rem;

   cursor: pointer;

   overflow: hidden;

   &:hover {
      &::before {
         content: '';

         width: 100%;
         height: 100%;

         position: absolute;
         top: 0;
         left: 0;

         border-radius: 1rem;

         z-index: 2;

         background-color: rgba(0, 0, 0, 0.1);
      }

      & > img {
         transform: scale(1.02);
      }
   }

   &.last {
      display: none;
   }

   @media (min-width: 1600px) {
      &.last-4,
      &.last-3 {
         display: block;
      }
   }

   @media (max-width: 1599px) {
      &.last-4 {
         display: none;
      }
   }

   @media (max-width: 1100px) {
      width: 11.11rem;

      margin-left: 0.5rem;

      &.last-4 {
         display: block;
      }
   }

   @media (max-width: 1000px) {
      width: 12.1rem;

      margin-left: 1rem;

      &.last-4 {
         display: none;
      }
   }

   @media (max-width: 900px) {
      &.last-4 {
         display: block;
      }
   }

   @media (max-width: 800px) {
      width: 10.6rem;
   }

   @media (max-width: 700px) {
      width: 12rem;

      &.last-4 {
         display: none;
      }
   }

   @media (max-width: 650px) {
      width: calc(100% / 5 - 1rem);

      &.last-4 {
         display: none;
      }
   }

   @media (max-width: 600px) {
      &.last-3 {
         display: none;
      }

      width: calc(100% / 4 - 0.9rem);
   }
`;

export const WrapperUserPhoto = styled.div`
   position: absolute;
   top: 1rem;
   left: 1rem;

   z-index: 5;
`;

export const UserPhoto = styled.img`
   width: 3.5rem;
   height: 3.5rem;

   border-radius: 50%;

   border: 3px solid ${props => props.theme.colors.blue};
`;

export const Content = styled.img`
   width: 100%;
   height: 100%;

   border-radius: 1rem;

   object-fit: cover;
`;

export const UserName = styled.p`
   position: absolute;
   bottom: 1rem;
   left: 1rem;
   right: 1rem;

   font-size: 1.5rem;
   font-weight: bold;

   color: ${props =>
      props.theme.title === 'light' ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.9)'};
`;

export const MoreStories = styled.div`
   width: 4.8rem;
   height: 4.8rem;

   border-radius: 50%;

   position: absolute;
   right: -2.4rem;

   z-index: 3;

   display: flex;
   align-items: center;
   justify-content: center;

   background-color: ${props => (props.theme.title === 'dark' ? '#3e4042' : '#fff')};

   cursor: pointer;

   &:hover {
      &::before {
         content: '';

         width: 100%;
         height: 100%;

         border-radius: 50%;

         background-color: ${props =>
            props.theme.title === 'dark'
               ? 'rgba(255, 255, 255, 0.05)'
               : 'rgba(0, 0, 0, 0.05)'};

         position: absolute;
      }
   }

   @media (max-width: 1100px) {
      right: -2rem;
   }

   @media (max-width: 700px) {
      display: none;
   }
`;

export const Arrow = styled(ImArrowRight2)`
   fill: ${props => props.theme.colors.gray};
`;

export const StoryEmpty = styled.div`
   width: 100%;
   height: 7.5rem;

   background-color: ${props => props.theme.colors.primary};

   border-radius: 1rem;
`;

export const StoryEmptyContent = styled.div`
   width: 100%;
   height: 7.5rem;

   padding: 1rem;

   position: relative;

   display: flex;
   align-items: center;

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

export const WrapperIcon = styled.div`
   width: 4rem;
   height: 4rem;

   border-radius: 50%;

   margin: 0 1.5rem 0 1rem;

   display: flex;
   align-items: center;
   justify-content: center;

   background-color: ${props =>
      props.theme.title === 'light' ? '#E7F3FF' : '#2D88FF33'};

   & > svg {
      fill: ${props => props.theme.colors.blue_two};

      width: 2.4rem;
      height: 2.4rem;
   }

   @media (max-width: 900px) {
      width: 4rem;
      height: 4rem;

      & > svg {
         width: 2.2rem;
         height: 2.2rem;
      }
   }
`;

export const StoryEmptyInfo = styled.div``;

export const Title = styled.p`
   font-size: 1.7rem;
   font-weight: 600;

   margin-bottom: 0.2rem;

   color: ${props => (props.theme.title === 'dark' ? '#fff' : '#000')};
`;

export const Description = styled.p`
   font-size: 1.5rem;

   color: ${props => props.theme.colors.gray};
`;
