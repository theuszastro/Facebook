import styled from 'styled-components';

import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

export const Container = styled.div`
   width: 100%;
   height: calc(100vh - 5.5rem);

   padding: 2rem 0.5rem 0.5rem;

   position: relative;

   display: flex;
   justify-content: space-between;
   flex-direction: column;

   overflow: hidden;

   &::-webkit-scrollbar {
      width: 10px;
   }

   &::-webkit-scrollbar-track {
      background: ${props => props.theme.colors.primary};
   }

   &::-webkit-scrollbar-thumb {
      border-radius: 1rem;

      background: ${props =>
         props.theme.title === 'light' ? '#3A3B3C' : 'rgba(255, 255, 255, 0.3)'};
   }

   &:hover {
      overflow: auto;
   }
`;

export const Action = styled.div`
   cursor: pointer;

   display: flex;
   align-items: center;

   padding: 0.8rem 1rem;

   border-radius: 1rem;

   position: relative;
   overflow: hidden;

   &:hover {
      &::before {
         content: '';

         width: 100%;
         height: 100%;

         position: absolute;
         top: 0;
         left: 0;

         background-color: ${props =>
            props.theme.title === 'light' ? 'rgba(0, 0, 0, .1)' : 'rgba(255, 255, 255, .1)'};
      }
   }
`;

export const ActionImage = styled.img`
   width: 3.6rem;
   height: 3.6rem;

   object-fit: contain;

   margin-right: 1.3rem;

   &.user {
      border-radius: 50%;
   }
`;

export const ActionName = styled.p`
   font-size: 1.5rem;

   line-height: 1.8rem;

   color: ${props => (props.theme.title === 'light' ? '#000' : '#fff')};

   &.icon {
      margin-left: 1rem;
   }
`;

export const WrapperIcon = styled.div`
   width: 3.6rem;
   height: 3.6rem;

   border-radius: 50%;

   display: flex;
   align-items: center;
   justify-content: center;

   background-color: ${props => props.theme.colors.gray_two};
`;

export const IconUp = styled(FaChevronUp)`
   fill: ${props => (props.theme.title === 'light' ? '#000' : '#fff')};
`;

export const IconDown = styled(FaChevronDown)`
   fill: ${props => (props.theme.title === 'light' ? '#000' : '#fff')};
`;

export const Footer = styled.footer`
   margin-top: 1rem;

   display: flex;
   align-items: center;

   flex-wrap: wrap;
`;

export const FooterItem = styled.p`
   font-size: 1.3rem;

   color: ${props => props.theme.colors.gray};

   cursor: pointer;

   word-wrap: break-word;

   &:hover {
      text-decoration: underline;
   }
`;

export const Separator = styled.div`
   width: 0.1rem;
   height: 0.1rem;

   margin-left: 0.5rem;

   border-radius: 50%;

   margin: 0 0.5rem;

   background: ${props => props.theme.colors.gray};
`;
