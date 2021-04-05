import React, { useRef, useState, useEffect } from 'react';

import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useRegex } from '../../hooks';

import dayjs from 'dayjs';

import api from '../../services/api';

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
   setshowCreate: any;
   refs: React.RefObject<HTMLInputElement>[];
   resetStates?: () => void;
   isPopup?: boolean;
   Checked?: boolean;
   setChecked?: any;
}

const FormLogin: React.FC<Props> = ({
   showCreate,
   setshowCreate,
   refs,
   resetStates = () => {},
   isPopup = false,
   Checked = false,
   setChecked,
}) => {
   const { emailRegex } = useRegex();
   const router = useRouter();

   const LoginInput = useRef({ email: '', password: '' });
   const PasswordRef = useRef<HTMLInputElement>(null);

   const [LoginErrors, setLoginErrors] = useState({
      email: false,
      password: false,
   });

   async function createLogin() {
      const { email, password } = LoginInput.current;

      const body = {
         ...(!isNaN(Number(email)) && { phone: email }),
         ...(isNaN(Number(email)) && { email }),
         password,
      };

      try {
         const response = await api.post('/login', body);

         const { token, userId } = response.data;

         const user = {
            id: userId,
            token,
         };

         const expires = new Date(dayjs().add(100, 'year').format());
         document.cookie = `user=${JSON.stringify(user)}; expires=${expires.toUTCString()}`;

         router.reload();
      } catch (err) {
         let errorObject = {
            ...LoginErrors,
         } as any;

         switch (err.response.data.error) {
            case 'Usuário inexistente':
               errorObject['email'] = true;

               break;

            case 'Senha incorreta':
               errorObject['password'] = true;

               break;
         }

         setLoginErrors(errorObject);
      }
   }

   function checkInput() {
      const { email } = LoginInput.current;

      let containError = false;

      const newErrorObject = { ...LoginErrors } as any;

      Object.entries(LoginInput.current).map(item => {
         if (item[1].length) {
            newErrorObject[item[0]] = false;
         } else {
            newErrorObject[item[0]] = true;
         }
      });

      if (!emailRegex.test(email)) {
         if (isNaN(Number(email))) {
            newErrorObject.email = true;
         } else {
            const regex = /[0-9]{10,11}/;

            if (!regex.test(email)) {
               newErrorObject.email = true;
            }
         }
      }

      Object.entries(newErrorObject).map(item => item[1] && (containError = true));
      setLoginErrors(newErrorObject);

      return containError;
   }

   function reset() {
      resetStates();

      LoginInput.current = { email: '', password: '' };

      if (refs[0].current && PasswordRef.current) {
         refs[0].current.value = '';
         PasswordRef.current.value = '';
      }
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
            !hasError && (await createLogin());
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

                     setshowCreate(true);
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
