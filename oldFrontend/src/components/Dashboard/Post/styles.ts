import styled, { css } from 'styled-components';

import { BiWorld } from 'react-icons/bi';
import { FaEllipsisH } from 'react-icons/fa';
import { FaRegCommentAlt } from 'react-icons/fa';

export const Container = styled.article`
   width: 100%;

   padding: 1rem 0 0;

   border-radius: 1rem;

   margin-bottom: 1rem;
   background-color: ${props => props.theme.colors.primary};
`;

export const WrapperAuthor = styled.div`
   width: 100%;

   padding: 0 2rem;

   display: flex;
   align-items: center;
   justify-content: space-between;
`;

export const Author = styled.div`
   display: flex;
   align-items: center;
`;

export const Avatar = styled.img`
   width: 3.8rem;
   height: 3.8rem;

   cursor: pointer;

   border-radius: 50%;

   user-select: none;
`;

export const Story = styled.div`
   width: 4.6rem;
   height: 4.6rem;

   display: flex;
   align-items: center;
   justify-content: center;

   border: 2px solid ${props => props.theme.colors.blue};
   border-radius: 50%;
`;

export const Details = styled.div`
   margin-left: 1rem;
`;

export const AuthorName = styled.p`
   color: ${props =>
      props.theme.title === 'dark' ? 'rgba(255, 255, 255, 0.9)' : '#000'};

   font-size: 1.5rem;

   font-weight: bold;

   cursor: pointer;

   &:hover {
      text-decoration: underline;
   }
`;

export const Status = styled.div`
   display: flex;
   align-items: center;

   margin-top: 0.2rem;
`;

export const Datetime = styled.p`
   color: ${props => props.theme.colors.gray};

   font-size: 1.3rem;

   cursor: pointer;

   &:hover {
      text-decoration: underline;
   }
`;

export const Separator = styled.div`
   width: 0.2rem;
   height: 0.2rem;

   border-radius: 50%;

   margin: 0.2rem 0.6rem 0;

   background-color: ${props => props.theme.colors.gray};
`;

export const World = styled(BiWorld)`
   fill: ${props => props.theme.colors.gray};

   margin-top: 0.2rem;

   user-select: none;
`;

export const WrapperOptions = styled.div`
   width: 3.6rem;
   height: 3.6rem;

   display: flex;
   align-items: center;
   justify-content: center;

   border-radius: 50%;

   position: relative;

   cursor: pointer;

   &:hover {
      &::before {
         content: '';

         width: 100%;
         height: 100%;

         border-radius: 50%;

         position: absolute;
         top: 0;
         left: 0;

         background-color: ${props =>
            props.theme.title === 'dark'
               ? 'rgba(255, 255, 255, 0.1)'
               : 'rgba(0, 0, 0, 0.1)'};
      }
   }

   user-select: none;
`;

export const Options = styled(FaEllipsisH)`
   fill: ${props => props.theme.colors.gray};
`;

export const WrapperDescription = styled.div`
   padding: 1rem 2rem;
`;

export const Description = styled.p`
   color: ${props =>
      props.theme.title === 'dark' ? 'rgba(255, 255, 255, 0.9)' : '#000'};

   font-size: 1.5rem;
`;

export const Assets = styled.div`
   width: 100%;
   height: 46rem;

   margin: 0.5rem 0;

   display: flex;
   align-items: center;

   line-height: 0;
`;

export const AssetImage = styled.img`
   height: 100%;

   object-fit: cover;

   user-select: none;
`;

export const AssetVideo = styled.video``;

export const Row = styled.div`
   width: 100%;

   display: flex;
   align-items: center;
   justify-content: space-between;
`;

export const Column = styled.div`
   width: 100%;

   display: flex;
   align-items: center;
   flex-direction: column;
   justify-content: space-between;
`;

export const FeedbackInfo = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;

   width: 100%;
   height: 4rem;

   padding: 0 2rem;

   border-bottom: 1px solid ${props => props.theme.colors.gray_two};
`;

const FeedbackCss = css`
   display: flex;
   align-items: center;
`;

const AmountCss = css`
   color: ${props => props.theme.colors.gray};

   font-size: 1.45rem;
`;

export const Likes = styled.div`
   ${FeedbackCss}
`;

export const Reactions = styled.div`
   display: flex;
   align-items: center;

   margin-right: 0.5rem;
`;

export const ReactionsSeparator = styled.div`
   width: 2.4rem;
   height: 2.4rem;

   border-radius: 50%;

   & > img {
      width: 2.4rem;
      height: 2.4rem;

      border: 2px solid ${props => props.theme.colors.primary};

      border-radius: 50%;

      cursor: pointer;
   }

   & + & {
      margin-left: -0.5rem;
   }
`;

export const ReactionAmount = styled.p`
   ${AmountCss};
`;

export const CommentsAndShares = styled.div`
   ${FeedbackCss};
`;

export const CommentsAmount = styled.p`
   ${AmountCss};

   &.withShares {
      margin-right: 1rem;
   }
`;

export const SharesAmount = styled.p`
   ${AmountCss};
`;

export const Actions = styled.div`
   width: 100%;
   height: 4.5rem;

   position: relative;

   padding: 0 2rem;

   display: flex;
   align-items: center;
   justify-content: space-between;

   border-bottom-left-radius: 1rem;
   border-bottom-right-radius: 1rem;
`;

export const Action = styled.div`
   width: 25rem;
   height: 3.5rem;

   border-radius: 0.8rem;

   cursor: pointer;

   display: flex;
   align-items: center;
   justify-content: center;

   margin: -0.4rem 1rem 0 0;

   position: relative;
   user-select: none;

   & > svg {
      margin-right: 0.8rem;
   }

   &.user {
      width: 8rem;

      margin: -0.4rem 0 0;

      & > svg.caret {
         fill: ${props => props.theme.colors.gray};
      }
   }

   &:hover {
      &::before {
         content: '';

         position: absolute;
         top: 0;
         left: 0;

         width: 100%;
         height: 100%;

         border-radius: 0.8rem;

         background: ${props =>
            props.theme.title === 'dark'
               ? 'rgba(255, 255, 255, 0.1)'
               : 'rgba(0, 0, 0, 0.1)'};
      }

      & > div.reactions {
         display: flex;

         &:hover {
            background: red;
         }
      }
   }
`;

export const ActionText = styled.p`
   font-size: 1.5rem;

   font-weight: bold;

   &.default {
      color: ${props => props.theme.colors.gray};
   }

   &.like {
      color: ${props => props.theme.colors.blue};
   }

   &.love {
      color: #f33e58;
   }

   &.care,
   &.haha,
   &.wow,
   &.sad {
      color: #f7b125;
   }

   &.angry {
      color: #e9710f;
   }
`;

export const CommentIcon = styled(FaRegCommentAlt)`
   fill: ${props => props.theme.colors.gray};
`;

export const AddReaction = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;

   background-color: ${props => props.theme.colors.primary};

   position: absolute;
   bottom: 100%;

   width: 35rem;
   height: 4.4rem;

   border-radius: 2rem;

   & > div:last-child {
      margin: 0;
   }

   z-index: 5;
`;

export const NewReaction = styled.div`
   margin-right: 1rem;

   border-radius: 2rem;

   & > img {
      width: 4rem;
      height: 4rem;

      cursor: pointer;

      &:hover {
         transform: scale(1.2);
      }
   }
`;

export const ShareWrapper = styled.div``;

export const Wrapper = styled.div``;

export const PostBox = styled.div`
   width: calc(100% - 4rem);
   min-height: 5rem;

   padding: 1rem 2rem;

   margin: -0.5rem 0 0.5rem 2rem;

   border: 1px solid ${props => props.theme.colors.gray_two};

   border-bottom-left-radius: 0.8rem;
   border-bottom-right-radius: 0.8rem;
`;

export const ShareOptions = styled.div`
   width: 36rem;
   height: 30rem;

   padding: 1rem;

   position: absolute;
   left: calc(80% - 36rem / 1.7);

   z-index: 2;

   user-select: none;

   display: flex;
   flex-direction: column;

   border-radius: 0.8rem;

   background-color: ${props => props.theme.colors.primary};
`;

export const Indicator = styled.div`
   width: 1rem;
   height: 1rem;

   border-radius: 0.25rem;

   position: absolute;
   left: calc(36rem / 2 - 0.5rem);

   transform: rotate(45deg);

   background-color: ${props => props.theme.colors.primary};
`;

export const ShareOption = styled.div`
   width: 100%;
   height: 4rem;

   padding: 0 1rem;

   display: flex;
   align-items: center;
   justify-content: center;

   position: relative;

   cursor: pointer;

   & > svg {
      fill: ${props =>
         props.theme.title === 'light' ? '#000' : 'rgba(255, 255, 255, .9)'};

      margin-right: 1rem;
   }

   & > img {
      width: 2rem;
      height: 2rem;

      margin-right: 1rem;

      object-fit: contain;
   }

   &:hover {
      &::before {
         content: '';

         border-radius: 0.8rem;

         width: 100%;
         height: 100%;

         position: absolute;
         top: 0;
         left: 0;

         background-color: ${props =>
            props.theme.title === 'light'
               ? 'rgba(0, 0, 0, .1)'
               : 'rgba(255, 255, 255, .2)'};
      }
   }
`;

export const ShareOptionLabel = styled.p`
   font-size: 1.5rem;

   flex: 1;

   color: ${props =>
      props.theme.title === 'light' ? '#000' : 'rgba(255, 255, 255, .9)'};
`;
