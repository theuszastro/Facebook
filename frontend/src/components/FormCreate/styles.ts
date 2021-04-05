import styled, { css } from 'styled-components';

import { CssOfInput } from '../FormLogin/styles';

export const Blur = styled.div`
   position: fixed;
   top: 0;
   left: 0;

   display: flex;
   align-items: center;
   justify-content: center;

   width: 100vw;
   height: 100vh;

   background-color: rgba(255, 255, 255, 0.8);

   z-index: 10;

   overflow-y: auto;

   &.error {
      cursor: pointer;
   }
`;

export const CreateForm = styled.form`
   width: 43.3rem;

   min-height: 51rem;
   max-height: 70rem;

   margin: 1rem 1.3rem 0 0;

   box-shadow: 0px 8px 15px 0px rgba(0, 0, 0, 0.15);

   border-radius: 0.8rem;

   color: #737373;
   background-color: #fff;

   position: relative;

   &.personalized {
      margin: 10rem 1.3rem 3rem 0;
   }

   @media (max-width: 900px) {
      margin: 0;
   }

   @media (max-width: 500px) {
      width: calc(100% - 4rem);

      &.personalized {
         margin: 10rem 0 2.5rem;
      }
   }
`;

export const FormHeader = styled.div`
   width: 100%;

   position: relative;

   padding: 1.6rem 1.6rem 1.2rem;
`;

export const Border = styled.div`
   width: 100%;
   height: 0.1rem;

   background-color: #ccc;
`;

export const HeaderTitle = styled.h1`
   font-size: 3.2rem;
   font-family: SFProDisplay-Bold, Helvetica, Arial, sans-serif;

   margin-bottom: 0.4rem;

   color: #000;
`;

export const HeaderDescription = styled.p`
   font-size: 1.5rem;
   font-family: SFProText-Regular, Helvetica, Arial, sans-serif;
`;

export const FormInput = styled.div`
   padding: 0.6rem 1.6rem 1.6rem;
`;

export const InputRow = styled.div`
   display: flex;
   align-items: center;
`;

export const CreateInputWrapper = styled.div`
   border: 1px solid #bdc7d8;
   border-radius: 0.8rem;

   width: 100%;
   height: 4rem;

   display: flex;
   align-items: center;

   margin-top: 1rem;

   background-color: var(--background);

   &.create {
      width: 90%;

      & + & {
         margin-left: 1rem;
      }
   }

   &.error {
      border: 1px solid #f02849;
   }
`;

export const Nome = styled.input`
   ${CssOfInput}

   padding: 0 1rem;

   border-radius: 0.5rem;

   width: 100%;

   height: 3.6rem;

   background-color: transparent;

   &.error {
      width: 80%;
   }
`;

export const Sobrenome = styled.input`
   ${CssOfInput}

   padding: 0 1rem;

   border-radius: 0.5rem;

   width: 100%;

   height: 3.6rem;

   background-color: transparent;

   &.error {
      width: 80%;
   }
`;

export const Email = styled.input`
   ${CssOfInput}

   padding: 0 1rem;

   border-radius: 0.5rem;

   height: 3.6rem;

   box-shadow: none;

   background-color: transparent;

   &.error {
      width: 88%;
   }
`;

export const Password = styled.input`
   ${CssOfInput}

   padding: 0 1rem;

   border-radius: 0.5rem;

   height: 3.6rem;

   box-shadow: none;

   background-color: transparent;

   &.error {
      width: 88%;
   }
`;

export const Row = styled.div`
   width: 100%;
   height: 2.5rem;

   display: flex;
   align-items: center;
   justify-content: space-between;
`;

export const DataOfBirth = styled.div`
   margin: 0.6rem 0rem 0rem;

   display: flex;
   align-items: center;
   justify-content: space-between;

   @media (max-width: 500px) {
      flex-wrap: wrap;
   }
`;

const cssOfSelect = css`
   width: calc(100% / 3 - 1rem);
   height: 3.6rem;

   border-radius: 0.5rem;
   border: 1px solid #bdc7d8;
   outline: 0;

   background: #fff;

   padding: 0 0.5rem;

   font-size: 1.5rem;

   position: relative;
   z-index: 5;

   &.error {
      border: 1px solid #f02849;
   }
`;

export const Day = styled.select`
   ${cssOfSelect};
`;

export const Month = styled.select`
   ${cssOfSelect};
`;

export const Year = styled.select`
   ${cssOfSelect};
`;

export const Option = styled.option``;

export const Gender = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;

   width: 100%;

   @media (max-width: 500px) {
      flex-wrap: wrap;
   }
`;

export const GenderOption = styled.div`
   height: 3.6rem;

   border-radius: 0.5rem;
   border: 1px solid #bdc7d8;

   padding: 0 1rem;

   user-select: none;
   -webkit-user-select: none;
   -khtml-user-select: none;
   -moz-user-select: none;
   -ms-user-select: none;

   cursor: pointer;

   display: flex;
   align-items: center;
   justify-content: space-between;

   &.error {
      border: 1px solid #f02849;
   }

   &.woman {
      width: calc(100% / 3 - 2.5rem);
   }

   &.male {
      width: calc(100% / 3 - 1.5rem);
   }

   &.personalized {
      width: calc(100% / 3 + 2.5rem);
   }
`;

export const GenderText = styled.p`
   font-size: 1.5rem;
   font-family: SFProDisplay-Bold, Helvetica, Arial, sans-serif;

   color: #000;
`;

export const Checkbox = styled.input.attrs({
   type: 'radio',
   multiple: false,
   name: 'gender',
})`
   margin-top: 0.2rem;

   cursor: pointer;
`;

export const WrapperPronome = styled.div`
   position: relative;

   margin-top: 1.5rem;

   width: 100%;
   height: 3.6rem;
`;

export const PronomePersonalized = styled.select`
   ${cssOfSelect};

   position: relative;

   z-index: 5;

   width: 100%;
`;

export const InputGender = styled.input`
   ${CssOfInput};

   padding: 0 1rem;

   border-radius: 0.5rem;

   width: 100%;

   height: 3.6rem;

   background-color: transparent;
`;

export const Termos = styled.p`
   margin: 1rem 0;

   font-size: 1.125rem;

   & > b {
      font-weight: normal;

      cursor: pointer;

      color: var(--blue);
   }

   & > b:hover {
      text-decoration: underline;
   }
`;

export const Center = styled.div`
   width: 100%;
   height: 6rem;

   display: flex;
   align-items: center;
   justify-content: center;
`;

export const Submit = styled.button`
   width: 20rem;
   height: 4rem;

   background-color: var(--green);

   border: 0;
   border-radius: 0.5rem;
   outline: 0;

   cursor: pointer;
   color: #fff;

   font-size: 1.8rem;
   font-family: SFProDisplay-Bold, Helvetica, Arial, sans-serif;
   font-weight: bold;

   transition: 400ms;

   &:hover {
      background-color: var(--green-hover);
   }
`;

export const AccountError = styled.div`
   width: 100%;
   min-height: 3rem;

   margin-top: 0.5rem;

   padding: 1rem;

   flex-wrap: wrap;

   display: flex;
   align-items: center;
   justify-content: center;

   border: 1px solid #dd3c10;
   background-color: #ffebe8;
`;

export const AccountErrorText = styled.p`
   font-size: 1.2rem;
   font-family: SFProDisplay-Bold, Helvetica, Arial, sans-serif;
   font-weight: 500;

   text-align: center;

   color: #dd3c10;
`;

export const FormularioErrorInfo = styled.div`
   position: absolute;

   display: flex;
   align-items: center;
   justify-content: center;

   border-radius: 0.5rem;

   padding: 1rem 1.5rem;

   box-shadow: 0 0 0 1px rgb(139 3 0 / 75%), 0 1px 10px rgb(0 0 0 / 35%);

   background-color: #dd3c10;
`;

export const ErrorInfo = styled.p`
   color: #fff;

   font-size: 1.4rem;
   font-family: Helvetica, Arial, sans-serif;
`;

export const ErrorIndicator = styled.div`
   width: 2rem;
   height: 2rem;

   border-radius: 0.3rem;

   position: absolute;

   &.right {
      top: 1.3rem;
      right: -0.9rem;

      transform: rotate(45deg);
   }

   &.up {
      left: 2rem;
      top: -1rem;

      transform: rotate(45deg);
   }

   background-color: #dd3c10;
`;
