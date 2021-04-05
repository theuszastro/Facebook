import styled, { css } from 'styled-components';

export const Blur = styled.div`
   position: fixed;
   left: 0;
   top: 0;

   z-index: 6;

   width: 100%;
   height: 100vh;

   display: flex;
   align-items: center;
   justify-content: center;

   background-color: rgba(0, 0, 0, 0.3);
`;

const formCss = css`
   width: 40rem;
   height: 49rem;

   margin-bottom: 4.5rem;
   margin-right: 1rem;

   position: relative;

   border-radius: 1rem;

   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;

   padding: 5.5rem 2rem 2rem;

   background-color: #fff;
`;

export const AccountLogin = styled.div`
   ${formCss};
`;

export const FormAccountLogin = styled.form`
   ${formCss};
`;

export const WrapperCheckbox = styled.div`
   width: 100%;
   height: 2.5rem;

   margin: 1rem 0 0;

   cursor: pointer;

   display: flex;
   align-items: center;

   user-select: none;
   -webkit-user-select: none;
   -khtml-user-select: none;
   -moz-user-select: none;
   -ms-user-select: none;
`;

export const Checkbox = styled.div`
   width: 2rem;
   height: 2rem;

   display: flex;
   align-items: center;
   justify-content: center;

   border-radius: 0.4rem;

   margin-right: 1.5rem;

   border: 1px solid #d7dade;

   &.checked {
      border: 0;

      background-color: var(--blue);
   }
`;

export const CheckboxLabel = styled.p`
   font-size: 1.4rem;

   color: #606770;
`;

export const Header = styled.div`
   background-color: #fff;

   position: relative;

   width: 100%;
   height: 6.5rem;

   display: flex;
   align-items: center;
   justify-content: center;

   margin-top: -3rem;

   border-top-left-radius: 0.8rem;
   border-top-right-radius: 0.8rem;

   border-bottom: 1px solid #dadde1;

   padding: 1.5rem;
`;

export const HeaderTitle = styled.p`
   font-size: 2rem;

   margin-top: 0.5rem;
`;
