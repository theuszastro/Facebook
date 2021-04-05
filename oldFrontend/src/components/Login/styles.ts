import styled, { css } from 'styled-components';

import { RiCloseFill } from 'react-icons/ri';

export const WrapperContainer = styled.div`
   position: relative;

   width: 100vw;
`;

export const Container = styled.div`
   width: 100vw;

   background-color: var(--background);

   position: relative;

   z-index: 5;

   display: flex;
   align-items: center;
   flex-direction: column;
`;

export const Background = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;

   width: 80%;
   min-height: 100vh;

   max-width: 98rem;
   margin-right: 2rem;

   padding-bottom: 6rem;

   @media (max-width: 1200px) {
      width: 90%;
   }

   @media (max-width: 1050px) {
      flex-direction: column;
      justify-content: center;

      margin: 0;
   }

   &.mobile {
      height: 100%;
   }
`;

export const Left = styled.div`
   margin-top: -12rem;

   padding-top: 6rem;

   display: flex;
   justify-content: center;
   flex-direction: column;

   &.lowered {
      margin-top: 1.5rem;
   }

   &.withoutAccounts {
      @media (max-width: 900px) {
         width: 39.8rem;
      }
   }

   @media (max-width: 900px) {
      margin: 0;

      text-align: center;

      height: 100%;

      padding-top: 0rem;

      align-items: center;
   }

   @media (max-width: 500px) {
      width: 100%;
   }
`;

export const Right = styled.div`
   margin-top: -2rem;

   padding-top: 6rem;

   &.withoutAccounts {
      @media (max-width: 900px) {
         padding-top: 0rem;
      }
   }

   @media (max-width: 400px) {
      width: 90%;
   }
`;

export const Logo = styled.img`
   width: 60%;
   height: 52.5%;

   margin-left: -2.8rem;

   @media (max-width: 900px) {
      margin: 0rem 0 2rem;

      width: 75%;
   }

   @media (max-width: 500px) {
      margin: 0rem 0 2rem;
   }
`;

export const Description = styled.p`
   font-size: 2.8rem;
   font-weight: 400;

   margin-top: -0.5rem;

   @media (max-width: 1080px) {
      font-size: 2.2rem;
   }

   @media (max-width: 900px) {
      font-size: 2.4rem;

      margin: -3rem 0 5rem;
   }

   @media (max-width: 500px) {
      font-size: 2rem;
   }
`;

export const LoginBox = styled.div`
   width: 39.8rem;
   min-height: 34.5rem;

   border-radius: 0.8rem;
   padding: 1.6rem 1.7rem;

   box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, 0.15);

   background-color: #fff;

   @media (max-width: 500px) {
      width: 100%;
   }
`;

export const CreateAccount = styled.button`
   width: 16.5rem;
   height: 4.8rem;

   margin-top: 1.5rem;

   border-radius: 0.5rem;
   border: 0px;
   outline: 0;

   font-size: 1.7rem;
   font-weight: 700;

   cursor: pointer;

   background-color: var(--green);
   color: #fff;

   transition: 400ms;

   &:hover {
      background-color: var(--green-hover);
   }
`;

export const Center = styled.div`
   width: 100%;

   height: 8rem;

   display: flex;
   align-items: center;
   justify-content: center;
`;

export const CreatePage = styled.p`
   margin: 3rem 0 0 0.8rem;

   font-size: 1.4rem;

   @media (max-width: 900px) {
      padding-bottom: 3rem;
   }
`;

export const Footer = styled.div`
   width: 100vw;
   height: 100%;

   padding: 2rem 0;

   display: flex;
   align-items: center;
   justify-content: center;

   background-color: #fff;
`;

export const FooterWrapper = styled.div`
   width: 80%;
   max-width: 100rem;

   margin-right: 2%;

   @media (max-width: 1080px) {
      width: 90%;

      margin-right: 1%;
   }
`;

export const Languages = styled.div`
   display: flex;
   align-items: center;

   flex-wrap: wrap;

   padding-bottom: 1rem;
   margin: 0.5rem 0;

   border-bottom: 1px solid #ccc;
`;

export const Language = styled.p`
   font-size: 1.2rem;
   font-family: Helvetica, Arial, sans-serif;

   color: #737373;

   margin-right: 1rem;

   cursor: pointer;

   &:hover {
      text-decoration: underline;
   }
`;

export const NewLanguage = styled.p`
   width: 3rem;
   height: 2rem;

   background-color: var(--background);

   display: flex;
   align-items: center;
   justify-content: center;

   cursor: pointer;

   border: 1px solid #ccc;
   outline: 0;
`;

export const Actions = styled.div`
   display: flex;
   align-items: center;

   flex-wrap: wrap;

   height: 100%;
`;

export const Action = styled.p`
   font-size: 1.2rem;
   font-family: Helvetica, Arial, sans-serif;

   color: #737373;

   margin-top: 0.6rem;
   margin-right: 1.8rem;

   cursor: pointer;

   &:hover {
      text-decoration: underline;
   }
`;

export const AdImage = styled.img`
   width: 1.5rem;
   height: 1.5rem;

   margin-top: 0.4rem;
`;

export const FacebookYear = styled.p`
   font-size: 1.2rem;
   font-family: Helvetica, Arial, sans-serif;

   color: #737373;

   margin-top: 2rem;
`;

export const TitleInfo = styled.p`
   font-size: 2.8rem;
   font-weight: 400;
`;

export const DescriptionInfo = styled.p`
   font-size: 1.5rem;
   font-weight: 400;

   margin: 0.4rem 0 2.5rem;

   color: #606770;
`;

export const AccountList = styled.div`
   width: 100%;

   display: grid;
   grid-template-columns: repeat(3, 1fr);
   grid-gap: 2rem;
`;

export const AccountItemWrapper = styled.div`
   &:hover {
      div.close {
         width: 2.5rem;
         height: 2.5rem;

         top: -0.5rem;
         left: -0.5rem;

         cursor: pointer;

         background: #fff;

         box-shadow: 0px 4px 6px 0px rgb(0 0 0 / 15%);
      }

      svg.close {
         width: 2rem;
         height: 2rem;

         cursor: pointer;

         fill: rgba(0, 0, 0, 0.3);
      }
   }
`;

export const AccountItem = styled.div`
   width: 16rem;
   height: 21rem;

   box-shadow: 0 0 0 1px #dddfe2;
   border-radius: 0.8rem;

   display: flex;
   align-items: center;
   justify-content: center;

   position: relative;

   cursor: pointer;

   background-color: #fff;

   padding: 16.5rem 0 0;

   transition: 200ms;

   &.new {
      flex-direction: column;

      padding: 0;

      & > p {
         margin-top: 1.25rem;
      }
   }

   &:hover {
      box-shadow: 0px 0px 15px 0px rgb(0 0 0 / 15%);
   }
`;

export const Close = styled.div`
   position: absolute;

   z-index: 2;

   user-select: none;
   -webkit-user-select: none;
   -khtml-user-select: none;
   -moz-user-select: none;
   -ms-user-select: none;

   display: flex;
   align-items: center;
   justify-content: center;

   width: 1.5rem;
   height: 1.5rem;

   border-radius: 50%;

   transition: 200ms;

   background-color: rgba(0, 0, 0, 0.3);

   &.close {
      top: 0.5rem;
      left: 0.5rem;
   }

   &.Login {
      background-color: #ebedf0;

      transition: 100ms;
   }

   &.Login:hover {
      background-color: rgba(0, 0, 0, 0.1);
   }
`;

export const CloseIcon = styled(RiCloseFill)`
   width: 1.5rem;
   height: 1.5rem;

   transition: 200ms;

   color: #fff;

   &.Login {
      width: 2.5rem;
      height: 2.5rem;

      color: #000;
   }
`;

export const AccountImage = styled.img`
   width: 100%;
   height: 16.5rem;

   position: absolute;
   top: 0;
   left: 0;

   z-index: 1;

   border: 0;

   border-top-left-radius: 0.8rem;
   border-top-right-radius: 0.8rem;
`;

export const AccountName = styled.p`
   color: #4b4f56;

   overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;

   padding: 0 1rem;

   font-size: 1.8rem;
`;

export const AccountBackground = styled.div`
   width: 100%;
   height: 16.5rem;

   margin-top: -1.25rem;

   border-top-left-radius: 0.8rem;
   border-top-right-radius: 0.8rem;

   display: flex;
   align-items: center;
   justify-content: center;

   background-color: #f5f6f7;
`;

export const CircleBlue = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;

   width: 4.2rem;
   height: 4.2rem;

   background-color: var(--blue);

   border-radius: 50%;
`;
