import React, { useState, useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

import dayjs from 'dayjs';
import { AES, enc } from 'crypto-js';

import { FaPlus } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';

import { AccountsType, AvatarType } from '../../context/types';
import { useLogin } from '../../hooks';

import { getAvatarUrl } from '../../utils/functions/Avatar';

import LoginArray from '../../utils/arrays/Login';
import Ad from '../../assets/ad.png';

import FormCreate from '../FormCreate';
import PopupAccount from '../PopupAccount';

import api from '../../services/api';

import FormLogin from '../FormLogin';

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

export interface PopupType {
   telefone?: number;
   email?: string;
   password: string;
}

const Login: React.FC = () => {
   const router = useRouter();
   const { Accounts, setAccounts, Remember } = useLogin();

   const EmailRef = useRef<HTMLInputElement>(null);

   const [isTablet, setisTablet] = useState(false);
   const [isMobile, setisMobile] = useState(false);
   const [showCreate, setshowCreate] = useState(false);

   const [isNewAccountPopup, setisNewAccountPopup] = useState(false);
   const [ShowPopup, setShowPopup] = useState(false);

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
      alert('não será feito essa funcionalidade!');
   }

   function updateAccounts(item: AccountsType) {
      const position =
         item.email && item.email.length
            ? Accounts.findIndex(ac => ac.email === item.email)
            : Accounts.findIndex(ac => ac.phone === item.phone);

      if (position != -1) {
         Accounts.splice(position, 1);

         setAccounts([...Accounts]);
      }

      if (Accounts.length) {
         const expires = new Date(dayjs().add(100, 'year').format());

         document.cookie = `accounts=${JSON.stringify(
            Accounts
         )}; expires=${expires.toUTCString()}`;
      } else {
         document.cookie = `accounts=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
   }

   async function checkAccount(item: AccountsType) {
      const rememberUser = Remember.find(
         re => re.email === item.email || re.phone === item.phone
      );

      if (rememberUser) {
         const { email, phone, password } = rememberUser;

         const bytes = AES.decrypt(password, 'secretpassforencrypt');
         const decryptedPassword = bytes.toString(enc.Utf8);

         const body = {
            ...(!isNaN(Number(phone)) && { phone }),
            ...(email && { email }),
            password: decryptedPassword,
         };

         const response = await api.post('/login', body);
         const { token } = response.data;

         const expires = new Date(dayjs().add(100, 'year').format());
         document.cookie = `user=${token}; expires=${expires.toUTCString()}`;

         router.reload();
      } else {
         AccountPopup.current = {
            id: item.id,
            firstname: item.firstname,
            lastname: item.lastname,
            sex: item.sex,
            email: item.email ? item.email : '',
            phone: item.phone && !isNaN(Number(item.phone)) ? item.phone : '',
            avatars: item.avatars,
            password: '',
         };

         setShowPopup(true);
      }
   }

   async function updateAvatarAccounts() {
      // let updatedAccounts: AccountsType[] = [];
      // Accounts.map(async item => {
      //    const response = await api.get(`/avatar/${item.id}`);
      //    const avatars = response.data.avatars;
      //    if (avatars.length) {
      //       item.avatar = `http://localhost:3333/file/${avatars[0].path}`;
      //    }
      //    updatedAccounts.push(item);
      // });
      // setTimeout(() => {
      //    const expires = new Date(dayjs().add(100, 'year').format());
      //    document.cookie = `accounts=${JSON.stringify(
      //       updatedAccounts
      //    )}; expires=${expires.toUTCString()}`;
      //    setAccounts([...updatedAccounts]);
      // }, 500);
   }

   useEffect(() => {
      if (Accounts.length) {
         updateAvatarAccounts();
      }
   }, []);

   useEffect(() => {
      window.onresize = function () {
         setisTablet(window.innerWidth <= 1080);
         setisMobile(window.innerWidth <= 900);
      };

      EmailRef.current?.focus();
   }, []);

   return (
      <WrapperContainer>
         {ShowPopup && (
            <PopupAccount
               AccountPopup={AccountPopup}
               showCreate={showCreate}
               setshowCreate={setshowCreate}
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
                                       onClick={e => updateAccounts(item)}
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
                        setshowCreate={setshowCreate}
                        refs={[EmailRef]}
                     />

                     <Center onClick={() => setshowCreate(true)}>
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
                     {LoginArray.languages.map((item, index) => (
                        <Language key={index} onClick={onClick}>
                           {item}
                        </Language>
                     ))}

                     <NewLanguage onClick={onClick}>
                        <GoPlus size={12.5} color="#000" />
                     </NewLanguage>
                  </Languages>

                  <Actions>
                     {LoginArray.actions.map((item, index) => {
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

            {showCreate && <FormCreate setShowCreate={setshowCreate} />}
         </Container>
      </WrapperContainer>
   );
};

export default Login;
