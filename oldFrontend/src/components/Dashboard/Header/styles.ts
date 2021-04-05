import styled, { css } from 'styled-components';

import { BsSearch, BsClock } from 'react-icons/bs';
import { ImArrowLeft2 } from 'react-icons/im';
import { AiOutlinePlus, AiFillCaretDown } from 'react-icons/ai';
import { FaFacebookMessenger } from 'react-icons/fa';

export const Container = styled.header`
   width: 100%;
   height: 5.5rem;

   padding: 0.6rem 0 0 1.5rem;

   background-color: ${props => props.theme.colors.primary};

   border-bottom: 1px solid
      ${props => (props.theme.title === 'light' ? '#f1f1f1' : '#444')};

   box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.3);

   position: sticky;
   top: 0;

   z-index: 10;
`;

export const Left = styled.div`
   width: 32.2rem;

   display: flex;
   align-items: center;

   padding: 0 1.8rem 0 0;

   margin-top: -0.6rem;

   border-radius: 1rem;

   position: relative;

   &.mobile {
      width: 100%;

      max-width: 19rem;
   }
`;

export const ResultsSearchred = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;

   width: 32.2rem;
   /* height: 30rem; */

   transition: 400ms;

   border-radius: 1rem;

   overflow: hidden;

   position: absolute;
   top: 0;
   left: -4%;

   background-color: ${props => props.theme.colors.primary};

   padding: 0.8rem 0 0;

   box-shadow: 7px 10px 31px 2px rgba(0, 0, 0, 0.13);
`;

export const ResultsHeader = styled.header`
   width: 100%;
   height: 4rem;

   display: flex;
   align-items: center;
`;

export const EmptyResults = styled.div`
   width: 100%;
   height: 4rem;

   display: flex;
   align-items: center;
   justify-content: center;
`;

export const EmptyResultsLabel = styled.p`
   font-size: 1.5rem;

   font-weight: 500;

   margin-top: -1rem;

   color: ${props => props.theme.colors.gray};
`;

export const ResultsMain = styled.main`
   width: 100%;
   height: 100%;

   padding: 0 1rem;
`;

export const HistoricWrapper = styled.div`
   width: 100%;
   height: 5.2rem;

   margin-top: 1rem;
   padding: 0 1rem;

   user-select: none;

   border-radius: 0.8rem;

   display: flex;
   align-items: center;

   cursor: pointer;
   position: relative;

   overflow: hidden;

   &:hover {
      &::before {
         content: '';

         position: absolute;
         top: 0;
         left: 0;

         width: 100%;
         height: 100%;

         background: ${props =>
            props.theme.title === 'dark'
               ? 'rgba(255, 255, 255, .1)'
               : 'rgba(0, 0, 0, .1)'};
      }
   }
`;

export const WrapperIcon = styled.div`
   width: 3.6rem;
   height: 3.6rem;

   border-radius: 50%;

   display: flex;
   align-items: center;
   justify-content: center;

   margin-right: 1rem;

   background: ${props => props.theme.colors.secondary};
`;

export const Clock = styled(BsClock)`
   fill: ${props =>
      props.theme.title === 'dark' ? 'rgba(255, 255, 255, .9)' : 'rgba(0, 0, 0, .9)'};
`;

export const HistoricLabel = styled.p`
   font-size: 1.5rem;

   font-weight: 500;

   color: ${props =>
      props.theme.title === 'dark' ? 'rgba(255, 255, 255, .9)' : 'rgba(0, 0, 0, .9)'};
`;

export const Row = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;

   padding: 0 1rem;
`;

export const RowLabel = styled.p`
   font-size: 1.6rem;

   font-weight: bold;

   color: ${props =>
      props.theme.title === 'dark' ? 'rgba(255, 255, 255, .9)' : 'rgba(0, 0, 0, .9)'};
`;

export const WrapperEditRecent = styled.div`
   width: 6rem;
   height: 3rem;

   border-radius: 0.4rem;

   display: flex;
   align-items: center;
   justify-content: center;

   position: relative;
   overflow: hidden;

   user-select: none;

   cursor: pointer;

   &:hover {
      &::before {
         content: '';

         position: absolute;
         top: 0;
         left: 0;

         width: 100%;
         height: 100%;

         background: ${props =>
            props.theme.title === 'dark'
               ? 'rgba(255, 255, 255, .1)'
               : 'rgba(0, 0, 0, .1)'};
      }
   }
`;

export const EditRecent = styled.p`
   font-size: 1.5rem;

   font-weight: 500;

   color: ${props => props.theme.colors.blue};
`;

export const SearchedUser = styled.div`
   height: 5rem;

   display: flex;
   align-items: center;

   position: relative;
   cursor: pointer;

   padding: 0 1rem;

   margin: 1rem 0;

   border-radius: 1rem;

   overflow: hidden;

   &:hover {
      &::before {
         content: '';

         position: absolute;
         top: 0;
         left: 0;

         width: 100%;
         height: 100%;

         background: ${props =>
            props.theme.title === 'dark'
               ? 'rgba(255, 255, 255, .1)'
               : 'rgba(0, 0, 0, .1)'};
      }
   }
`;

export const SearchedAvatar = styled.img`
   width: 3.6rem;
   height: 3.6rem;

   margin-right: 1rem;

   border-radius: 50%;
`;

export const WrapperUserSearched = styled.div``;

export const SearchedUserName = styled.p`
   font-size: 1.5rem;

   font-weight: 500;

   color: ${props => (props.theme.title === 'dark' ? '#fff' : '#000')};
`;

export const Friend = styled.p`
   margin-top: 0.25rem;

   font-size: 1.3rem;

   font-weight: 500;

   color: ${props => props.theme.colors.gray};
`;

export const Back = styled.div`
   width: 3.6rem;
   height: 3.6rem;

   border-radius: 50%;

   display: flex;
   align-items: center;
   justify-content: center;

   cursor: pointer;

   &:hover {
      background: rgba(255, 255, 255, 0.1);
   }

   margin-top: 0.2rem;
   margin-left: 0.8rem;
`;

export const BackIcon = styled(ImArrowLeft2)`
   fill: ${props => props.theme.colors.gray};
`;

export const SearchBox = styled.div`
   display: flex;
   align-items: center;

   margin-top: 0.6rem;
`;

export const Logo = styled.img`
   width: 4rem;
   height: 4rem;

   box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.3);
`;

export const WrapperInput = styled.div<{ Focused: boolean; OpenInput: boolean }>`
   height: 4rem;

   display: flex;
   align-items: center;

   margin-left: 0.8rem;

   border-radius: 2rem;

   padding: 0 1.2rem;

   background-color: ${props =>
      props.theme.title == 'light'
         ? props.theme.colors.secondary
         : props.theme.colors.gray_two};

   &.mobile {
      width: 4rem;
      height: 4rem;

      padding: 0;

      justify-content: center;

      cursor: pointer;

      & > input {
         width: 0;
         height: 0;

         padding: 0;
      }

      ${props =>
         props.OpenInput &&
         css`
            width: 100%;

            padding: 0 1.2rem;

            & > input {
               width: 20rem;
               height: 4rem;

               padding: 0.2rem 0 0 0.7rem;
            }
         `}
   }
`;

export const SearchIcon = styled(BsSearch)`
   fill: ${props => props.theme.colors.gray};
`;

export const SearchInput = styled.input`
   width: 20rem;
   height: 4rem;

   border: 0;
   outline: 0;

   padding: 0.2rem 0 0 0.7rem;

   background-color: transparent;
   color: ${props =>
      props.theme.title === 'dark' ? 'rgba(255, 255, 255, .9)' : 'rgba(0, 0, 0, .9)'};

   caret-color: ${props => (props.theme.title === 'light' ? '#000' : '#fff')};

   &.extend {
      width: 22.8rem;

      &.focused {
         width: 21.2rem;
      }

      &:focus {
         &::placeholder {
            color: #888;

            font-size: 1.5rem;
         }
      }
   }

   &::placeholder {
      color: ${props => props.theme.colors.gray};

      font-size: 1.5rem;
   }
`;

export const Center = styled.div`
   display: flex;
   align-items: center;

   margin-top: -0.8rem;
   margin-left: 3.1rem;

   @media (min-width: 1600px) {
      margin-left: 4rem;
   }

   @media (max-width: 1200px) {
      margin-left: 2rem;
   }

   @media (max-width: 1340px) {
      margin-left: 2rem;
   }
`;

export const Tab = styled.div`
   height: 5.5rem;

   &.active {
      margin-bottom: -0.6rem;

      border-bottom: 3px solid ${props => props.theme.colors.blue};
   }

   & + & {
      margin-left: 1rem;
   }
`;

export const TabItem = styled.div`
   width: 11.11rem;
   height: 5rem;

   margin-top: 0.3rem;

   display: flex;
   align-items: center;
   justify-content: center;

   cursor: pointer;

   border-radius: 0.8rem;

   & > svg {
      fill: ${props => props.theme.colors.gray};

      margin-top: 0.5rem;
   }

   transition: 400ms;

   &:hover {
      background-color: ${props =>
         props.theme.title === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)'};
   }

   &.active:hover {
      background: transparent;
   }

   &.active {
      & > svg {
         fill: ${props => props.theme.colors.blue};
      }
   }

   @media (min-width: 1600px) {
      width: 13.5rem;
   }

   @media (max-width: 1050px) {
      width: 10.1rem;
   }

   @media (max-width: 950px) {
      width: 8.1rem;
   }

   @media (max-width: 800px) {
      width: 6.4rem;
   }

   @media (max-width: 750px) {
      width: 5rem;
   }

   @media (max-width: 700px) {
      display: none;
   }
`;

export const Right = styled.div`
   display: flex;
   align-items: center;
   justify-content: flex-end;

   min-width: 36.8rem;
   height: 4rem;

   @media (max-width: 1300px) {
      width: 100%;

      min-width: 15rem;
      max-width: 20rem;
   }

   @media (max-width: 900px) {
      min-width: 20rem;
      max-width: 25rem;
   }
`;

export const CurrentUser = styled.div`
   display: flex;
   align-items: center;

   padding: 0.25rem;

   border-radius: 2rem;

   height: 4rem;

   cursor: pointer;

   &:hover {
      background-color: ${props =>
         props.theme.title === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)'};
   }

   @media (max-width: 1300px) {
      display: none;
   }
`;

export const Avatar = styled.img`
   width: 2.8rem;
   height: 2.8rem;

   border-radius: 50%;
`;

export const Username = styled.p`
   margin: 0 0.8rem 0 0.5rem;

   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;

   max-width: 8vw;

   font-size: 1.5rem;
   font-weight: bold;

   color: ${props => (props.theme.title == 'light' ? '#000' : '#fff')};

   @media(min-width: 1600px) {
      max-width: 12vw;
   }

   @media(max-width: 1300px) {
      max-width: 10vw;
   }
`;

export const BackgroundIcon = styled.div`
   width: 4rem;
   height: 4rem;

   border-radius: 50%;

   background-color: ${props =>
      props.theme.title == 'light'
         ? props.theme.colors.secondary
         : props.theme.colors.gray_two};

   margin-left: 0.8rem;
`;

export const Icon = styled.div`
   width: 4rem;
   height: 4rem;

   border-radius: 50%;

   display: flex;
   align-items: center;
   justify-content: center;

   cursor: pointer;

   &:hover {
      background-color: ${props =>
         props.theme.title === 'dark'
            ? 'rgba(255, 255, 255, 0.2)'
            : 'rgba(0, 0, 0, 0.1)'};
   }

   & > svg {
      fill: ${props => (props.theme.title == 'light' ? '#000' : '#fff')};
   }
`;

export const NewIcon = styled(AiOutlinePlus)``;

export const Messenger = styled(FaFacebookMessenger)``;

export const Settings = styled(AiFillCaretDown)``;
