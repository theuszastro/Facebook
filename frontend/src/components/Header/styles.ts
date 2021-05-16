import styled, { css } from 'styled-components';

import { BsSearch, BsClock } from 'react-icons/bs';
import { ImArrowLeft2 } from 'react-icons/im';

export const Container = styled.header`
   width: 99%;
   height: 5.6rem;

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

      display: flex;
      justify-content: flex-end;
   }
`;

export const PageTabs = styled.div`
   width: 100%;
   height: 5.5rem;

   display: flex;
   align-items: center;
   justify-content: space-between;

   @media (max-width: 1100px) {
      width: 82%;
   }

   @media (max-width: 700px) {
      display: none;
   }
`;

export const PageTabMain = styled.div`
   & > svg {
      fill: ${props => props.theme.colors.gray};

      margin-top: 0.3rem;
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

   @media (max-width: 1100px) {
      width: calc(100% / 4 - 3rem);
   }
`;
