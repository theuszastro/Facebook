import React, { useState, useRef, useEffect, RefObject, MutableRefObject } from 'react';

import Link from 'next/link';

import { FaCheck } from 'react-icons/fa';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';

import { useRegex } from '../../hooks';

import { WrapperCheckbox, Checkbox, CheckboxLabel } from '../PopupAccount/styles';

import {
   Form,
   WrapperInput,
   MessageOfError,
   FixCenter,
   EmailOrPhone,
   Password,
   Submit,
   ForgotPassword,
} from './styles';

interface Props {
   showCreate: boolean;
   setShowCreate: any;
   refs: RefObject<HTMLInputElement>[];
   createLogin: (
      LoginInput: MutableRefObject<{
         email: string;
         password: string;
      }>,
      setErrors: any
   ) => Promise<void>;
   resetStates?: () => void;
   isPopup?: boolean;
   Checked?: boolean;
   setChecked?: any;
}

const FormLogin: React.FC<Props> = ({
   showCreate,
   setShowCreate,
   refs,
   createLogin,
   resetStates = () => {},
   isPopup = false,
   Checked = false,
   setChecked,
}) => {
   const { emailRegex, phoneRegex } = useRegex();

   const LoginInput = useRef({ email: '', password: '' });
   const PasswordRef = useRef<HTMLInputElement>(null);

   const [LoginErrors, setLoginErrors] = useState({
      email: false,
      password: false,
   });

   function reset() {
      resetStates();

      LoginInput.current = { email: '', password: '' };

      if (refs[0].current && PasswordRef.current) {
         refs[0].current.value = '';
         PasswordRef.current.value = '';
      }
   }

   function checkInput() {
      const { email } = LoginInput.current;

      let containError = false;
      const newErrorObject = { ...LoginErrors } as any;

      Object.entries(LoginInput.current).map(item =>
         item[1].length ? (newErrorObject[item[0]] = false) : (newErrorObject[item[0]] = true)
      );

      if (!emailRegex.test(email) && !phoneRegex.test(email)) {
         newErrorObject['email'] = true;

         newErrorObject['password'] = false;
      }

      Object.values(newErrorObject).map(item => item && (containError = true));
      setLoginErrors(newErrorObject);

      return containError;
   }

   useEffect(() => {
      if (showCreate) {
         if (refs[0].current) {
            refs[0].current.value = '';
         }

         if (PasswordRef.current) {
            PasswordRef.current.value = '';
         }

         LoginInput.current = { email: '', password: '' };
      }
   }, [showCreate]);

   return (
      <Form
         onSubmit={async e => {
            e.preventDefault();

            const hasError = checkInput();
            !hasError && (await createLogin(LoginInput, setLoginErrors));
         }}
      >
         <WrapperInput
            className={LoginErrors.email ? 'error' : ''}
            style={{
               marginBottom: LoginErrors.email ? 0 : '1rem',
            }}
         >
            <EmailOrPhone
               className={LoginErrors.email ? 'error' : ''}
               ref={refs[0]}
               name="email"
               placeholder="Email ou telefone"
               onChange={e => (LoginInput.current['email'] = e.target.value)}
            />

            {LoginErrors.email && (
               <BsFillExclamationTriangleFill
                  size={22.5}
                  color="#f02849"
                  style={{
                     marginLeft: '0.8rem',
                  }}
               />
            )}
         </WrapperInput>

         {LoginErrors.email && (
            <MessageOfError>
               O email ou o número de telefone inserido não corresponde a nenhuma conta.{' '}
               <strong
                  onClick={() => {
                     reset();

                     setShowCreate(true);
                  }}
               >
                  Cadastre-se para abrir uma conta.
               </strong>
            </MessageOfError>
         )}

         <WrapperInput className={LoginErrors.password ? 'error' : ''}>
            <Password
               ref={PasswordRef}
               className={LoginErrors.password ? 'error' : ''}
               placeholder="Senha"
               name="password"
               type="password"
               onChange={e => (LoginInput.current['password'] = e.target.value)}
            />

            {LoginErrors.password && (
               <BsFillExclamationTriangleFill
                  size={22.5}
                  color="#f02849"
                  style={{
                     marginLeft: '0.8rem',
                  }}
               />
            )}
         </WrapperInput>

         <FixCenter>
            {LoginErrors.password && (
               <MessageOfError style={{ marginBottom: 0 }}>
                  A senha inserida está incorreta{' '}
                  <strong onClick={() => alert('inha')}>Esqueceu a senha?</strong>
               </MessageOfError>
            )}
         </FixCenter>

         {isPopup && (
            <WrapperCheckbox onClick={() => (Checked ? setChecked(false) : setChecked(true))}>
               <Checkbox className={Checked ? 'checked' : ''}>
                  <FaCheck size={12.5} color="#fff" />
               </Checkbox>

               <CheckboxLabel>Lembrar senha</CheckboxLabel>
            </WrapperCheckbox>
         )}

         <Submit
            type="submit"
            style={{
               ...(isPopup && {
                  marginTop: '2.5rem',
                  height: '4.25rem',
                  marginBottom: '0.8rem',
               }),
            }}
         >
            Entrar
         </Submit>

         <Link href="">
            <ForgotPassword
               style={{
                  ...(isPopup && {
                     fontSize: '1.7rem',
                  }),
               }}
            >
               Esqueceu a senha?
            </ForgotPassword>
         </Link>
      </Form>
   );
};

export default FormLogin;
