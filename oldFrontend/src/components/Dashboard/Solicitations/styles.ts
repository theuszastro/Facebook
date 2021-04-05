import styled, { css } from 'styled-components';

export const Container = styled.div``;

export const SolicitationsHeader = styled.header`
   width: 100%;

   display: flex;
   align-items: center;
   justify-content: space-between;
`;

export const SolicitationsTitle = styled.p`
   font-size: 1.7rem;
   font-weight: bold;

   color: ${props => props.theme.colors.gray};
`;

export const WrapperViewAllSolicitations = styled.div`
   width: 7rem;
   height: 3rem;

   border-radius: 0.4rem;

   overflow: hidden;
   position: relative;

   cursor: pointer;

   user-select: none;

   display: flex;
   align-items: center;
   justify-content: center;

   &:hover {
      &::before {
         content: '';

         width: 100%;
         height: 100%;

         position: absolute;

         background-color: ${props =>
            props.theme.title === 'light'
               ? 'rgba(0, 0, 0, .1)'
               : 'rgba(255, 255, 255, .1)'};
      }
   }
`;

export const ViewAllSolicitations = styled.p`
   font-size: 1.4rem;

   color: ${props => props.theme.colors.blue};
`;

export const Solicitation = styled.article`
   width: 100%;

   margin-top: 1rem;

   border-radius: 0.6rem;
   overflow: hidden;

   position: relative;
   cursor: pointer;

   display: flex;
   align-items: center;
   justify-content: center;

   padding: 1rem 1rem;

   position: relative;
`;

export const SolicitationHover = styled.div`
   width: 100%;
   height: 100%;

   position: absolute;

   z-index: 1;

   transition: 400ms;

   &:hover {
      background-color: ${props =>
         props.theme.title === 'light' ? 'rgba(0, 0, 0, .1)' : 'rgba(255, 255, 255, .1)'};
   }
`;

export const Avatar = styled.img`
   width: 5rem;
   height: 5rem;

   border-radius: 50%;

   margin-right: 1rem;
`;

export const SolicitationDetailsWrapper = styled.div`
   width: 100%;
`;

export const SolicitationDetails = styled.div``;

export const SolicitationRow = styled.div``;

export const SolicitationColumn = styled.div`
   max-width: 100%;

   display: flex;
   align-items: center;
   justify-content: space-between;
`;

export const Username = styled.p`
   max-width: 16rem;

   font-size: 1.5rem;
   font-weight: bold;

   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;

   color: ${props => (props.theme.title == 'dark' ? '#fff' : '#000')};

   @media (min-width: 1600px) {
      max-width: 19rem;
   }

   @media (max-width: 1200px) {
      max-width: 13rem;
   }

   @media (max-width: 1150px) {
      max-width: 18rem;
   }
`;

export const FriendsCommon = styled.p`
   font-size: 1.4rem;

   color: ${props => props.theme.colors.gray};

   margin: 0.25rem 0;
`;

export const SolicitationTime = styled.p`
   white-space: nowrap;

   font-size: 1.4rem;

   color: ${props => props.theme.colors.gray};
`;

export const SolicitationActions = styled.footer`
   width: 100%;

   display: grid;
   grid-template-columns: 1fr 1fr;
   grid-gap: 1rem;

   margin: 0.8rem 0 0;

   @media (max-width: 1200px) {
      grid-template-columns: 1fr;
   }

   @media (max-width: 1150px) {
      grid-template-columns: 1fr 1fr;
   }
`;

const buttonCss = css`
   width: 100%;
   height: 3.5rem;

   outline: 0;
   border: 0;
   border-radius: 0.8rem;

   cursor: pointer;

   position: relative;
   z-index: 3;

   overflow: hidden;

   font-size: 1.4rem;
   font-weight: bold;

   &:hover {
      &::before {
         content: '';

         width: 100%;
         height: 100%;

         position: absolute;
         top: 0;
         left: 0;

         background-color: ${props =>
            props.theme.title === 'light'
               ? 'rgba(0, 0, 0, .1)'
               : 'rgba(255, 255, 255, .1)'};
      }
   }
`;

export const SolicitationAccept = styled.button`
   ${buttonCss};

   color: #fff;
   background: ${props => props.theme.colors.blue};
`;

export const SolicitationReject = styled.button`
   ${buttonCss};

   color: ${props => (props.theme.title === 'dark' ? '#fff' : '#000')};
   background: ${props => props.theme.colors.gray_two};
`;
