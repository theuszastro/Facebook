import React, { useState, useEffect, useRef, MutableRefObject } from 'react';

import { useRouter } from 'next/router';
import { AES, enc } from 'crypto-js';

import { GoPlus } from 'react-icons/go';
import { FaPlus } from 'react-icons/fa';

import Ad from '../../assets/ad.png';

import { useAccounts } from '../../hooks';
import { AvatarType, AccountsType } from '../../context/types';

import { getAvatarUrl } from '../../utils/functions/User';
import { actions, languages } from '../../utils/arrays/Login';
import Constants from '../../utils/Constants';

import FormCreate from '../FormCreate';
import FormLogin from '../FormLogin';
import PopupAccount from '../PopupAccount';

import api from '../../services/api';

import {
   WrapperContainer,
   Container,
   Background,
   Left,
   Right,
   Logo,
   Description,
   LoginBox,
   CreateAccount,
   Center,
   CreatePage,
   Footer,
   FooterWrapper,
   Languages,
   Language,
   NewLanguage,
   Actions,
   Action,
   AdImage,
   FacebookYear,
   TitleInfo,
   DescriptionInfo,
   AccountList,
   AccountItem,
   Close,
   CloseIcon,
   AccountImage,
   AccountName,
   AccountBackground,
   CircleBlue,
   AccountItemWrapper,
} from './styles';

const Login: React.FC = () => {
   const { Accounts, setAccounts, Remembers, setRemembers } = useAccounts();

   const router = useRouter();

   const [showCreate, setShowCreate] = useState(false);
   const [showPopup, setShowPopup] = useState(false);

   const [isTablet, setisTablet] = useState(false);
   const [isMobile, setisMobile] = useState(false);

   const [isNewAccountPopup, setisNewAccountPopup] = useState(false);

   const EmailRef = useRef<HTMLInputElement>(null);
   const AccountPopup = useRef({
      id: '',
      firstname: '',
      lastname: '',
      sex: '',
      email: '',
      phone: '',
      avatars: [] as AvatarType[],
      password: '',
   });

   function onClick() {
      alert('não será feito');
   }

   function updateCookie(position: number) {
      const { saveCookie, deleteCookie } = Constants;

      Accounts.splice(position, 1);

      if (Accounts.length) {
         const AccountsString = JSON.stringify(Accounts);

         document.cookie = `accounts=${AccountsString}; expires=${saveCookie}`;
      } else {
         document.cookie = `accounts=; expires=${deleteCookie}`;
      }

      setAccounts([...Accounts]);
   }

   async function checkAccount(item: AccountsType) {
      const { email, phone } = item;

      const hasRemember = Remembers.find(re => re.email === email && re.phone === phone);

      if (hasRemember) {
         const { email, phone, password } = hasRemember;
         const { crypto, saveCookie } = Constants;

         const decryptedPassword = AES.decrypt(password, crypto).toString(enc.Utf8);

         const body = {
            ...(email ? { email } : { phone }),
            password: decryptedPassword,
         };

         const response = await api.post('/login', body);
         const { token, userId: id } = response.data;
         const user = { id, token };

         document.cookie = `user=${JSON.stringify(user)}; expires=${saveCookie}`;

         router.reload();

         return;
      }

      AccountPopup.current = { ...item };

      setShowPopup(true);
   }

   async function createLogin(
      LoginInput: MutableRefObject<{ email: string; password: string }>,
      setErrors: any
   ) {
      const { email, password } = LoginInput.current;
      const { saveCookie } = Constants;

      const body = {
         ...(isNaN(Number(email)) ? { email } : { phone: Number(email) }),
         password,
      };

      try {
         const response = await api.post('/login', body);
         const { userId: id, token } = response.data;

         const user = JSON.stringify({ id, token });

         document.cookie = `user=${user}; expires=${saveCookie}`;

         router.reload();
      } catch (err) {
         const newErrorsObject = { email: false, password: false } as any;
         const error = err.response.data.error;

         switch (error) {
            case 'this user not exist':
               newErrorsObject['email'] = true;

               break;

            case 'this password not is valid':
               newErrorsObject['password'] = true;

               break;
         }

         setErrors(newErrorsObject);
      }
   }

   useEffect(() => {
      window.onresize = function () {
         setisTablet(window.innerWidth <= 1080);
         setisMobile(window.innerWidth <= 900);
      };

      EmailRef.current?.focus();
   }, []);

   return (
      <WrapperContainer>
         {showPopup && (
            <PopupAccount
               AccountPopup={AccountPopup}
               showCreate={showCreate}
               setShowCreate={setShowCreate}
               isNewAccount={isNewAccountPopup}
               callback={() => {
                  setShowPopup(false);

                  isNewAccountPopup && setisNewAccountPopup(false);
               }}
            />
         )}

         <Container>
            <Background className={isMobile ? 'mobile' : ''}>
               <Left
                  className={
                     Accounts.length >= 3
                        ? 'lowered'
                        : `${Accounts.length <= 0 ? 'withoutAccounts' : ''}`
                  }
               >
                  {Accounts ? (
                     <div style={{ width: '34rem', marginLeft: '0.5rem' }}>
                        <Logo src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" />
                     </div>
                  ) : (
                     <Logo src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" />
                  )}

                  {Accounts.length ? (
                     <>
                        <TitleInfo>Logins recentes</TitleInfo>
                        <DescriptionInfo>
                           Clique na sua foto ou adicione uma conta.
                        </DescriptionInfo>

                        <AccountList>
                           {Accounts.map((item, index) => {
                              return (
                                 <AccountItemWrapper
                                    key={index * 24}
                                    style={{ position: 'relative' }}
                                 >
                                    <Close
                                       className="close"
                                       onClick={e => updateCookie(index)}
                                    >
                                       <CloseIcon className="close" />
                                    </Close>

                                    <AccountItem onClick={e => checkAccount(item)}>
                                       <AccountImage
                                          src={getAvatarUrl({
                                             sex: item.sex,
                                             avatars: item.avatars,
                                          })}
                                       />

                                       <AccountName>{`${item.firstname} ${item.lastname}`}</AccountName>
                                    </AccountItem>
                                 </AccountItemWrapper>
                              );
                           })}

                           {Accounts.length < 6 && (
                              <AccountItem
                                 className="new"
                                 onClick={() => {
                                    AccountPopup.current = {
                                       id: '',
                                       firstname: '',
                                       lastname: '',
                                       sex: '',
                                       email: '',
                                       phone: '',
                                       avatars: [],
                                       password: '',
                                    };

                                    setisNewAccountPopup(true);

                                    setShowPopup(true);
                                 }}
                              >
                                 <AccountBackground>
                                    <CircleBlue>
                                       <FaPlus size={25} color="#FFF" />
                                    </CircleBlue>
                                 </AccountBackground>

                                 <AccountName style={{ color: 'var(--blue)' }}>
                                    Adicionar conta
                                 </AccountName>
                              </AccountItem>
                           )}
                        </AccountList>
                     </>
                  ) : (
                     <Description>
                        O Facebook ajuda você a se conectar e {!isTablet && <br />}
                        compartilhar com as pessoas que {!isTablet && <br />}
                        fazem parte da sua vida.
                     </Description>
                  )}
               </Left>

               <Right className={Accounts.length <= 0 ? 'withoutAccounts' : ''}>
                  <LoginBox>
                     <FormLogin
                        showCreate={showCreate}
                        setShowCreate={setShowCreate}
                        refs={[EmailRef]}
                        createLogin={createLogin}
                     />

                     <Center onClick={() => setShowCreate(true)}>
                        <CreateAccount>Criar nova conta</CreateAccount>
                     </Center>
                  </LoginBox>

                  <CreatePage>
                     <b>Criar uma Página</b> para uma celebridade, banda ou empresa.
                  </CreatePage>
               </Right>
            </Background>

            <Footer>
               <FooterWrapper>
                  <Languages>
                     {languages.map((item, index) => (
                        <Language key={index} onClick={onClick}>
                           {item}
                        </Language>
                     ))}

                     <NewLanguage onClick={onClick}>
                        <GoPlus size={12.5} color="#000" />
                     </NewLanguage>
                  </Languages>

                  <Actions>
                     {actions.map((item, index) => {
                        if (item === 'Escolhas para anúncios') {
                           return (
                              <div key={index * 4} style={{ display: 'flex' }}>
                                 <Action style={{ marginRight: 0 }}>{item}</Action>

                                 <AdImage src={Ad} style={{ marginRight: '2rem' }} />
                              </div>
                           );
                        }

                        return <Action key={index * 4}>{item}</Action>;
                     })}
                  </Actions>

                  <FacebookYear>Facebook © 2021</FacebookYear>
               </FooterWrapper>
            </Footer>

            {showCreate && <FormCreate setShowCreate={setShowCreate} />}
         </Container>
      </WrapperContainer>
   );
};

export default Login;
