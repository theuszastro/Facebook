import styled, { css } from 'styled-components';

export const CssOfInput = css`
   width: 100%;
   height: 5.2rem;

   border-radius: 0.5rem;
   border: 0;
   outline: 0;

   margin-top: 0.2rem;

   font-size: 1.6rem;

   padding: 0 1.6rem;

   color: #000;

   caret-color: rgba(25, 102, 255, 0.9);

   &.error {
      width: 88%;

      padding: 0 0.4rem 0 1.6rem;

      margin: 0;
   }

   ::placeholder {
      color: #888;
   }

   :-ms-input-placeholder {
      color: #888;
   }

   ::-ms-input-placeholder {
      color: #888;
   }

   @media (max-width: 400px) {
      &.error {
         width: 84%;

         margin: 0;
      }
   }
`;

export const Form = styled.form`
   display: flex;
   align-items: center;
   flex-direction: column;

   width: 100%;

   border-bottom: 1px solid #ccc;
`;

export const WrapperInput = styled.div`
   display: flex;
   align-items: center;

   border-radius: 0.5rem;
   border: 1px solid #dddfe2;

   &:focus-within {
      border-color: transparent;

      box-shadow: 0px 0px 5px 0px rgba(25, 102, 255, 0.9);
   }

   &.popup {
      margin-top: 0.2rem;

      &:focus-within {
         border: 1px;

         margin-top: 0.2rem;
      }
   }

   &.error {
      border: 1.5px solid #f02849;

      box-shadow: none;
   }

   width: 100%;
`;

export const MessageOfError = styled.p`
   color: #f02849;

   margin: 1.25rem 0;

   font-size: 1.3rem;

   line-height: 1.6rem;

   & > strong {
      cursor: pointer;
   }

   & > strong:hover {
      text-decoration: underline;
   }
`;

export const FixCenter = styled.div`
   width: 100%;
`;

export const EmailOrPhone = styled.input`
   ${CssOfInput};

   &:focus {
      border: 0;

      ::placeholder {
         color: rgba(0.66, 0.66, 0.66, 0.3);
      }

      :-ms-input-placeholder {
         color: rgba(0.66, 0.66, 0.66, 0.3);
      }

      ::-ms-input-placeholder {
         color: rgba(0.66, 0.66, 0.66, 0.3);
      }
   }
`;

export const Password = styled.input`
   ${CssOfInput};

   &:focus {
      border: 0;

      ::placeholder {
         color: rgba(0.66, 0.66, 0.66, 0.3);
      }

      :-ms-input-placeholder {
         color: rgba(0.66, 0.66, 0.66, 0.3);
      }

      ::-ms-input-placeholder {
         color: rgba(0.66, 0.66, 0.66, 0.3);
      }
   }
`;

export const Submit = styled.button`
   width: 100%;
   height: 5rem;

   border-radius: 0.5rem;
   border: 0px;
   outline: 0;

   margin-top: 1.2rem;

   font-size: 1.9rem;
   font-weight: 700;

   cursor: pointer;

   letter-spacing: 0.0002rem;

   background-color: var(--blue);
   color: #fff;

   transition: 400ms;

   &:hover {
      background-color: rgb(25, 80, 240);
   }
`;

export const ForgotPassword = styled.p`
   color: var(--blue);

   margin: 1.5rem 0 2rem;

   font-size: 1.5rem;

   font-weight: 500;

   cursor: pointer;

   &:hover {
      text-decoration: underline;
   }
`;
