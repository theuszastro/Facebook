import styled from 'styled-components';

export const Container = styled.div`
   width: 100vw;
   height: 100vh;

   position: absolute;
   top: 0;
   left: 0;

   overflow-y: scroll;
   overflow-x: hidden;

   z-index: 6;

   background-color: ${props =>
      props.theme.title === 'dark' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.8)'};
`;

export const HeaderSpace = styled.div`
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

export const Row = styled.header`
   width: 100.1%;

   display: flex;
   align-items: center;
   justify-content: space-between;
`;

export const Main = styled.main`
   width: 100%;
   height: calc(100% - 5.6rem);

   display: flex;
   align-items: center;
   justify-content: center;
`;
