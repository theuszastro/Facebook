import styled from 'styled-components';

export const Container = styled.div`
   width: 100%;
   height: 100%;

   position: relative;

   display: grid;
   grid-template-columns: 36rem 59.4rem 36rem;
   grid-template-areas:
      'ml ma mr'
      'ml ma mr';

   justify-content: space-between;
   align-items: center;

   &::before {
      content: '';

      width: 100vw;
      height: 100vh;

      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      z-index: -1;

      background-color: ${props => props.theme.colors.secondary};
   }

   @media (min-width: 1600px) {
      grid-template-columns: 38rem 71.4rem 38rem;
      justify-content: center;

      margin-left: -1.3rem;
   }

   @media (max-width: 1350px) {
      grid-template-columns: 28rem 59.4rem 28rem;
   }

   @media (max-width: 1150px) {
      grid-template-columns: 64% 35%;
      grid-template-areas:
         'ma mr'
         'ma mr';
   }

   @media (max-width: 900px) {
      grid-template-columns: 85%;
      grid-template-areas: 'ma';

      justify-content: center;
   }

   @media (max-width: 800px) {
      grid-template-columns: 95%;
   }

   @media (max-width: 700px) {
      grid-template-columns: 100%;
   }
`;

export const Fixed = styled.div`
   height: 100%;

   position: relative;

   @media (max-width: 900px) {
      display: none;
   }
`;

export const Left = styled.div`
   width: 100%;
   height: calc(100vh - 5.5rem);

   position: sticky;
   top: 5.5rem;
   left: 0;
`;

export const Center = styled.div`
   width: 100%;
   height: 100%;

   padding: 2rem 0 0;

   grid-area: ma;

   @media (min-width: 1600px) {
      margin-left: 0rem;
   }

   @media (max-width: 1599px) {
      margin-left: -1.35rem;
   }

   @media (max-width: 1300px) {
      margin-left: 0;
   }

   @media (max-width: 1150px) {
      padding: 2rem 2.5rem;
   }

   @media (max-width: 700px) {
      max-width: 100vw;
   }
`;

export const Right = styled.div`
   width: 100%;
   height: calc(100vh - 5.5rem);

   position: sticky;
   top: 5.5rem;
   right: 0;

   display: flex;
   justify-content: flex-end;

   @media (max-width: 1150px) {
      justify-content: normal;
   }
`;

export const Intermediator = styled.div`
   width: 30.5rem;

   @media (min-width: 1600px) {
      width: 34rem;
   }

   @media (max-width: 1150px) {
      width: 98%;
   }
`;
