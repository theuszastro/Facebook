import styled from 'styled-components';

export const Container = styled.div`
   width: 100%;
   height: calc(100vh - 5.5rem);

   padding: 2rem 2rem 0 0;

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
