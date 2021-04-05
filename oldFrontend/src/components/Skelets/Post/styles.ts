import styled from 'styled-components';

import { shade, lighten } from 'polished';

export const Container = styled.article`
   width: 100%;
   height: 25rem;

   background-color: ${props => props.theme.colors.primary};

   border-radius: 1rem;

   padding: 1rem 0 2rem;

   display: flex;
   justify-content: space-between;
   flex-direction: column;

   & + & {
      margin-top: 2rem;
   }
`;

export const WrapperAuthor = styled.header`
   display: flex;
   align-items: center;

   padding: 0 2rem;

   height: 4rem;
`;

export const Avatar = styled.div`
   width: 4rem;
   height: 4rem;

   border-radius: 50%;

   margin-right: 1rem;

   background-color: ${props =>
      props.theme.title === 'light'
         ? lighten(0.03, props.theme.colors.gray_two)
         : shade(0.18, props.theme.colors.gray_two)};
`;

export const Author = styled.div`
   height: 100%;

   display: flex;
   flex-direction: column;
   justify-content: space-evenly;
`;

export const AuthorName = styled.div`
   width: 12rem;
   height: 1.2rem;

   border-radius: 0.5rem;

   background-color: ${props =>
      props.theme.title === 'light'
         ? lighten(0.03, props.theme.colors.gray_two)
         : shade(0.18, props.theme.colors.gray_two)};
`;

export const Datetime = styled.div`
   width: 14rem;
   height: 1.2rem;

   border-radius: 0.5rem;

   background-color: ${props =>
      props.theme.title === 'light'
         ? lighten(0.03, props.theme.colors.gray_two)
         : shade(0.18, props.theme.colors.gray_two)};
`;

export const WrapperActions = styled.footer`
   width: 100%;
`;

export const Actions = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-around;

   padding: 0 2rem;
`;

export const Action = styled.div`
   width: 6rem;
   height: 1.2rem;

   border-radius: 0.5rem;

   background-color: ${props =>
      props.theme.title === 'light'
         ? lighten(0.03, props.theme.colors.gray_two)
         : shade(0.18, props.theme.colors.gray_two)};
`;
