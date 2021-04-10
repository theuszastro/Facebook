import styled from 'styled-components';

export const WrapperContainer = styled.div`
   width: 100vw;
`;

export const Container = styled.div`
   width: 99%;
   height: 100%;

   position: relative;

   display: flex;
   justify-content: space-between;

   &::before {
      content: '';

      flex: 1;

      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      z-index: -1;

      background-color: ${props => props.theme.colors.secondary};
   }

   @media (min-width: 1600px) {
      justify-content: center;
   }

   @media (max-width: 1100px) {
      justify-content: center;
   }
`;

export const Left = styled.div`
   width: 36rem;

   height: calc(100vh - 5.5rem);

   position: sticky;
   top: 5.6rem;
   left: 0;

   @media (max-width: 1100px) {
      display: none;
   }
`;

export const Center = styled.div`
   width: 63rem;

   height: 100%;

   flex-shrink: 0;

   padding: 2rem 0;

   @media (min-width: 1370px) {
      width: 64rem;
   }

   @media (max-width: 1100px) {
      margin-right: 10rem;
   }

   @media (max-width: 900px) {
      width: 75rem;

      margin-right: 0;
   }

   @media (max-width: 750px) {
      width: 60rem;

      margin-right: 1rem;
   }

   @media (max-width: 600px) {
      width: 100%;
   }
`;

export const Right = styled.div`
   width: 36rem;
   height: calc(100vh - 5.5rem);

   position: sticky;
   top: 5.6rem;
   right: 0;

   @media (max-width: 1100px) {
      margin-right: -10rem;
   }

   @media (max-width: 900px) {
      display: none;
   }
`;
