import styled from 'styled-components';

import { GoSearch } from 'react-icons/go';

export const WrapperSearchInput = styled.div`
   width: 24.2rem;
   height: 4rem;

   margin-left: 0.7rem;

   border-radius: 20rem;

   display: flex;
   align-items: center;

   position: relative;

   cursor: text;

   background: ${props =>
      props.theme.title === 'light'
         ? props.theme.colors.secondary
         : props.theme.colors.gray_two};
`;

export const SearchIcon = styled(GoSearch)`
   margin: 0 0.8rem 0 1.2rem;

   fill: ${props => props.theme.colors.gray};
`;

export const Container = styled.div`
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
