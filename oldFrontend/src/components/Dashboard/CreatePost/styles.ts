import styled from 'styled-components';

import { BiHappyAlt } from 'react-icons/bi';

export const Container = styled.div`
   width: 100%;
   height: 100%;

   margin-top: 2rem;

   border-radius: 1rem;

   padding: 1.1rem 2rem;

   background-color: ${props => props.theme.colors.primary};
`;

export const WrapperCreate = styled.div`
   display: flex;
   align-items: center;

   padding: 0 0 1.1rem 0;

   border-bottom: 1px solid
      ${props =>
         props.theme.title == 'light'
            ? props.theme.colors.secondary
            : props.theme.colors.gray_two};
`;

export const Avatar = styled.img`
   width: 4rem;
   height: 4rem;

   margin-right: 1rem;

   cursor: pointer;

   border-radius: 50%;
`;

export const OpenCreate = styled.p`
   width: 100%;
   height: 4rem;

   border-radius: 3rem;

   padding: 0 0 0 1rem;

   display: flex;
   align-items: center;
   justify-content: flex-start;

   position: relative;

   cursor: pointer;

   font-size: 1.6rem;

   color: ${props => props.theme.colors.gray};

   background-color: ${props =>
      props.theme.title == 'light'
         ? props.theme.colors.secondary
         : props.theme.colors.gray_two};

   &:hover {
      &::before {
         content: '';

         width: 100%;
         height: 100%;

         position: absolute;
         top: 0;
         left: 0;

         border-radius: 3rem;

         background-color: ${props =>
            props.theme.title === 'dark'
               ? 'rgba(255, 255, 255, 0.05)'
               : 'rgba(0, 0, 0, 0.05)'};
      }
   }
`;

export const Actions = styled.div`
   width: 100%;

   margin-top: 1rem;

   display: flex;
   align-items: center;
   justify-content: space-between;
`;

export const Action = styled.div`
   width: 90%;
   height: 4rem;

   display: flex;
   align-items: center;
   justify-content: center;

   position: relative;

   cursor: pointer;

   & + & {
      margin-left: 1rem;
   }

   &:hover {
      &::before {
         content: '';

         width: 100%;
         height: 100%;

         position: absolute;
         top: 0;
         left: 0;

         border-radius: 0.8rem;

         background-color: ${props =>
            props.theme.title === 'dark'
               ? 'rgba(255, 255, 255, 0.1)'
               : 'rgba(0, 0, 0, 0.1)'};
      }
   }
`;

export const ActionName = styled.p`
   font-size: 1.4rem;

   font-weight: bold;

   color: ${props => props.theme.colors.gray};

   margin-left: 0.5rem;
`;

export const FaceHappy = styled(BiHappyAlt)``;
