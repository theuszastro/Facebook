import styled, { css } from 'styled-components';

import { BsSearch, BsClock } from 'react-icons/bs';
import { GoSearch } from 'react-icons/go';
import { ImArrowLeft2 } from 'react-icons/im';

export const Container = styled.header`
   width: 99%;
   height: 5.5rem;

   border-bottom: 1px solid ${props => (props.theme.title === 'light' ? '#f1f1f1' : '#444')};
   box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.3);

   display: flex;
   justify-content: space-between;

   position: sticky;
   top: 0;

   z-index: 5;

   background-color: ${props => props.theme.colors.primary};

   @media (max-width: 1100px) {
      width: 98.6%;
   }
`;

export const WrapperSearchInput = styled.div`
   width: 24.2rem;
   height: 4rem;

   margin-left: 0.7rem;

   border-radius: 20rem;

   display: flex;
   align-items: center;

   cursor: text;

   background: ${props => props.theme.colors.gray_two};
`;

export const SearchIcon = styled(GoSearch)`
   margin: 0 0.8rem 0 1.2rem;

   fill: ${props => props.theme.colors.gray};
`;

export const Left = styled.div`
   width: 36rem;
   height: 5.5rem;

   display: flex;

   padding: 0.8rem 0 0 1.5rem;

   &.mobile {
      ${WrapperSearchInput} {
         width: 4rem;
         height: 4rem;

         justify-content: center;
         align-items: center;

         cursor: pointer;
      }

      ${SearchIcon} {
         margin: 0;
      }
   }

   @media (max-width: 1100px) {
      width: 20rem;
   }
`;

export const LogoImage = styled.img`
   width: 4rem;
   height: 4rem;
`;

export const SearchInput = styled.input`
   width: 20.8rem;
   height: 4rem;

   border-top-right-radius: 20rem;
   border-bottom-right-radius: 20rem;

   border: 0;
   outline: 0;

   background: transparent;

   caret-color: ${props => (props.theme.title === 'dark' ? '#fff' : '#000')};

   &::placeholder {
      font-size: 1.5rem;

      color: ${props => props.theme.colors.gray};
   }
`;

export const Center = styled.div`
   width: 63rem;

   flex-shrink: 0;

   @media (min-width: 1370px) {
      width: 64rem;
   }

   @media (max-width: 1250px) {
      width: 62rem;
   }

   @media (max-width: 1100px) {
      width: 52rem;
   }
`;

export const PageTabs = styled.div`
   width: 100%;
   height: 5.5rem;

   display: flex;
   align-items: center;
   justify-content: space-between;

   @media (max-width: 700px) {
      display: none;
   }

   @media (max-width: 1100px) {
      width: 80%;
   }
`;

export const PageTabMain = styled.div`
   & > svg {
      fill: ${props => props.theme.colors.gray};
   }
`;

export const PageTabHover = styled.div`
   width: 100%;
   height: 85%;

   position: absolute;

   border-radius: 0.7rem;
`;

export const PageTab = styled.div`
   width: calc(100% / 4 + 4rem);
   height: 100%;

   display: flex;
   align-items: center;
   justify-content: center;

   cursor: pointer;

   position: relative;

   &:not(.active):hover {
      ${PageTabHover} {
         background: ${props => props.theme.colors.hover};
      }
   }

   &.active {
      border-bottom: 0.3rem solid ${props => props.theme.colors.blue};

      ${PageTabMain} > svg {
         fill: ${props => props.theme.colors.blue};
      }
   }

   &.hamburger {
      width: 5rem;
      height: 100%;

      margin-left: 1.6rem;
   }
`;

export const Right = styled.div`
   width: 36rem;

   display: flex;
   align-items: center;
   justify-content: space-between;
`;

export const Actions = styled.div`
   width: calc(100% - 15rem);
   height: 100%;

   display: flex;
   align-items: center;
   justify-content: flex-end;
`;

export const Action = styled.div`
   width: 4rem;
   height: 4rem;

   display: flex;
   align-items: center;
   justify-content: center;

   border-radius: 50%;

   cursor: pointer;

   overflow: hidden;

   position: relative;

   background: ${props => props.theme.colors.gray_two};

   & + & {
      margin-left: 1rem;
   }

   &:last-child {
      margin-right: 1rem;
   }

   & > svg {
      fill: ${props => props.theme.colors.label};
   }
`;

export const CurrentUser = styled.div`
   width: 14rem;
   height: 3.5rem;

   display: flex;
   align-items: center;

   border-radius: 1.8rem;

   overflow: hidden;

   position: relative;

   cursor: pointer;

   @media (max-width: 1260px) {
      display: none;
   }
`;

export const ElementHover = styled.div`
   width: 100%;
   height: 100%;

   position: absolute;

   &:hover {
      background: ${props => props.theme.colors.hover};
   }
`;

export const CurrentUserAvatar = styled.img`
   width: 2.8rem;
   height: 2.8rem;

   margin: 0 0.5rem 0 0.3rem;

   border-radius: 50%;
`;

export const CurrentUserName = styled.p`
   font-size: 1.6rem;
   font-weight: bold;

   color: ${props => props.theme.colors.label};

   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;

   width: 10rem;
`;
