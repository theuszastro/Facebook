import React, { useState, useEffect, useRef, useMemo } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import dayjs from 'dayjs';
import { AES } from 'crypto-js';

import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';

import api from '../../services/api';

import { AccountsType } from '../../context/types';
import { useLogin, useRegex } from '../../hooks';
import { getAvatarUrl } from '../../utils/functions/Avatar';

import FormLogin from '../FormLogin';

import { MessageOfError } from '../FormLogin/styles';

import {
   Blur,
   AccountLogin,
   WrapperCheckbox,
   Checkbox,
   CheckboxLabel,
   Header,
   HeaderTitle,
   FormAccountLogin,
} from './styles';
import { Close, CloseIcon, AccountImage, AccountName } from '../Login/styles';
import { WrapperInput, Password, Submit, ForgotPassword } from '../FormLogin/styles';

interface Props {
   isNewAccount: boolean;
   AccountPopup: React.MutableRefObject<AccountsType>;
   showCreate: boolean;
   setshowCreate: any;
   callback: () => void;
}

const PopupAccount: React.FC<Props> = ({
   isNewAccount,
   AccountPopup,
   showCreate,
   setshowCreate,
   callback,
}) => {
   const router = useRouter();
   const { Remember } = useLogin();

   const { emailRegex } = useRegex();

   const EmailRef = useRef<HTMLInputElement>(null);

   const [Checked, setChecked] = useState(false);
   const [PopupErrors, setPopupErrors] = useState({
      email: false,
      password: false,
   });

   const condicao = useMemo(() => {
      let errors: boolean[] = [];

      Object.entries(PopupErrors).map(item => item[1] && errors.push(item[1]));

      const condicao = errors.length == 1 ? 36 : 40;

      return errors.length == 0 ? 34 : condicao;
   }, [PopupErrors]);

   function checkErrors() {
      const { email, phone, password } = AccountPopup.current;

      let errors = { email: false, password: false } as any;
      let containsError = false;

      if (!emailRegex.test(email)) {
         if (isNaN(Number(phone))) {
            errors['email'] = true;

            containsError = true;
         } else {
            const regex = /[0-9]{10,11}/;

            if (!regex.test(phone)) {
               errors['email'] = true;

               containsError = true;
            }
         }
      }

      if (!password) {
         errors['password'] = true;

         containsError = true;
      }

      setPopupErrors(errors);

      return containsError;
   }

   function updateState(key: string, value: string) {
      AccountPopup.current = {
         ...AccountPopup.current,
         [key]: value,
      };

      setPopupErrors({
         ...PopupErrors,
         [key]: false,
      });
   }

   function resetStates() {
      setPopupErrors({ email: false, password: false });

      AccountPopup.current = {
         ...AccountPopup.current,
         password: '',
      };

      callback();
   }

   async function createLogin() {
      const { email, phone, password } = AccountPopup.current;

      const body = {
         ...(!isNaN(Number(phone)) ? { phone } : { email }),
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

         if (Checked) {
            const passwordEncrypt = AES.encrypt(password, 'secretpassforencrypt');
            const rememberIndex = Remember.findIndex(
               re => re.email === email || re.phone === phone
            );

            if (rememberIndex != -1) {
               Remember.splice(rememberIndex, 1);
            }

            Remember.push({
               ...(email ? { email } : { phone }),
               password: passwordEncrypt.toString(),
            });

            const expires = new Date(dayjs().add(100, 'year').format());
            document.cookie = `remember=${JSON.stringify(
               Remember
            )}; expires=${expires.toUTCString()}
            `;
         }

         router.reload();
      } catch (err) {
         console.log(err.response);

         switch (err.response.data.error) {
            case 'Senha incorreta':
               setPopupErrors({ ...PopupErrors, password: true });

               break;
         }
      }
   }

   useEffect(() => {
      if (isNewAccount) {
         const { email } = AccountPopup.current;

         if (email.length <= 0) {
            EmailRef.current?.focus();
         }
      }
   }, [isNewAccount]);

   return (
      <Blur>
         {isNewAccount ? (
            <AccountLogin
               style={{
                  height: `${condicao}rem`,
                  marginBottom: '6rem',
                  padding: 0,
               }}
            >
               <Header>
                  <HeaderTitle>Entrar no Facebook</HeaderTitle>

                  <Close
                     className="Login"
                     style={{
                        width: '3.6rem',
                        height: '3.6rem',
                        top: '1rem',
                        right: '1.5rem',
                        cursor: 'pointer',
                     }}
                     onClick={resetStates}
                  >
                     <CloseIcon onClick={resetStates} className="Login" />
                  </Close>
               </Header>

               <div
                  style={{
                     width: '100%',
                     padding: '1.5rem',
                     display: 'flex',
                     alignItems: 'center',
                     flexDirection: 'column',
                  }}
               >
                  <FormLogin
                     showCreate={showCreate}
                     setshowCreate={setshowCreate}
                     resetStates={resetStates}
                     refs={[EmailRef]}
                     isPopup={true}
                     Checked={Checked}
                     setChecked={setChecked}
                  />
               </div>
            </AccountLogin>
         ) : (
            <FormAccountLogin
               style={{
                  height: PopupErrors.password ? '52rem' : '49rem',
               }}
               onSubmit={async e => {
                  e.preventDefault();

                  const hasError = checkErrors();

                  !hasError && createLogin();
               }}
            >
               <Close
                  className="Login"
                  style={{
                     width: '3.6rem',
                     height: '3.6rem',
                     top: '1rem',
                     right: '1rem',
                     cursor: 'pointer',
                  }}
                  onClick={resetStates}
               >
                  <CloseIcon onClick={resetStates} className="Login" />
               </Close>

               <div style={{ marginBottom: '1rem' }}>
                  <AccountImage
                     src={getAvatarUrl({
                        sex: AccountPopup.current.sex,
                        avatars: AccountPopup.current.avatars,
                     })}
                     style={{
                        width: '16.2rem',
                        height: '16.2rem',
                        backgroundColor: '#000',
                        position: 'relative',
                        borderRadius: '50%',
                     }}
                  />
               </div>

               <AccountName>{`${AccountPopup.current.firstname} ${AccountPopup.current.lastname}`}</AccountName>

               <WrapperInput
                  className={PopupErrors.password ? 'error' : ''}
                  style={{ marginTop: '1.8rem' }}
               >
                  <Password
                     className={PopupErrors.password ? 'error' : ''}
                     type="password"
                     placeholder="Senha"
                     onChange={e => updateState('password', e.target.value)}
                  />

                  {PopupErrors.password && (
                     <BsFillExclamationTriangleFill
                        size={22.5}
                        color="#f02849"
                        style={{
                           marginLeft: '0.8rem',
                        }}
                     />
                  )}
               </WrapperInput>

               {PopupErrors.password && (
                  <MessageOfError style={{ marginBottom: 0, marginLeft: '-5rem' }}>
                     A senha inserida está incorreta{' '}
                     <strong onClick={() => alert('inha')}>Esqueceu a senha?</strong>
                  </MessageOfError>
               )}

               <WrapperCheckbox onClick={() => setChecked(!Checked)} className="popup">
                  <Checkbox className={Checked ? 'checked' : ''}>
                     <FaCheck size={12.5} color="#fff" />
                  </Checkbox>

                  <CheckboxLabel>Lembrar senha</CheckboxLabel>
               </WrapperCheckbox>

               <Submit
                  type="submit"
                  style={{
                     marginTop: '2.5rem',
                     height: '4.5rem',
                  }}
               >
                  Entrar
               </Submit>

               <Link href="">
                  <ForgotPassword
                     style={{
                        fontSize: '1.7rem',
                        marginBottom: '1rem',
                        marginTop: '2rem',
                     }}
                  >
                     Esqueceu a senha?
                  </ForgotPassword>
               </Link>
            </FormAccountLogin>
         )}
      </Blur>
   );
};

export default PopupAccount;
