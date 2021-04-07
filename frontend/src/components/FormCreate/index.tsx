import React, { useState, useRef, useEffect, useMemo } from 'react';

import { IoMdClose } from 'react-icons/io';

import { months } from '../../utils/arrays/CreateUser';
import { getDays, getYears } from '../../utils/functions/CreateUser';
import Constants from '../../utils/Constants';

import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { useRegex } from '../../hooks';

import api from '../../services/api';

import InputError from '../InputError';

import {
   Blur,
   CreateForm,
   FormHeader,
   AccountError,
   AccountErrorText,
   HeaderTitle,
   HeaderDescription,
   FormInput,
   InputRow,
   CreateInputWrapper,
   Nome,
   Sobrenome,
   Email,
   Password,
   Row,
   DataOfBirth,
   Day,
   Month,
   Year,
   Option,
   Border,
   Gender,
   GenderOption,
   GenderText,
   Checkbox,
   WrapperPronome,
   PronomePersonalized,
   InputGender,
   Termos,
   Center,
   Submit,
   FormularioErrorInfo,
   ErrorInfo,
   ErrorIndicator,
} from './styles';

interface Props {
   setShowCreate: any;
}

const FormCreate: React.FC<Props> = ({ setShowCreate }) => {
   const { emailRegex, phoneRegex } = useRegex();
   const router = useRouter();

   const days = useMemo(getDays, []);
   const years = useMemo(getYears, []);

   const NomeRef = useRef<HTMLInputElement>(null);
   const SobrenomeRef = useRef<HTMLInputElement>(null);
   const EmailRef = useRef<HTMLInputElement>(null);
   const ConfirmEmailRef = useRef<HTMLInputElement>(null);
   const PasswordRef = useRef<HTMLInputElement>(null);

   const CreateInput = useRef({
      firstname: '',
      lastname: '',
      email: '',
      confirmEmail: '',
      password: '',
      birth: {
         day: dayjs().date(),
         month: dayjs().month(),
         year: dayjs().year(),
      },
      gender: '',
      pronome: '',
   });

   const [CreateErrors, setCreateErrors] = useState({
      firstname: false,
      lastname: false,
      email: false,
      confirmEmail: false,
      password: false,
      birth: false,
      gender: false,
      pronome: false,
      userAlreadyExists: false,
      userPasswordVeryShort: false,
   });

   const [ShowConfirmEmail, setShowConfirmEmail] = useState(false);
   const [GenderAlternatives, setGenderAlternatives] = useState({
      male: false,
      female: false,
      personalized: false,
   });

   const [ErrorPositionAndLength, setErrorPositionAndLength] = useState({
      width: '15rem',
      height: '4.5rem',
      x: '',
      y: '',
      actualShow: '',
      show: false,
      isTop: false,
      labelError: '',
   });

   function inputsBlurCheckError(field: string) {
      let ErrorObject = { ...CreateErrors } as any;

      Object.entries(CreateInput.current).map(item => {
         if (typeof item[1] === 'object') {
            return;
         }

         if (item[0] === field) {
            if (field === 'confirmEmail') return;

            if (field === 'email') {
               ErrorObject[item[0]] = !emailRegex.test(item[1]) && !phoneRegex.test(item[1]);

               return;
            }

            ErrorObject[item[0]] = item[1].length ? false : true;
         }
      });

      setCreateErrors(ErrorObject);
   }

   function showErrorInfos(field: string) {
      const { email } = CreateInput.current;
      const { actualShow } = ErrorPositionAndLength;

      setCreateErrors({
         ...CreateErrors,
         ...(actualShow && { [actualShow]: true }),
         [field]: false,
      });

      switch (field) {
         case 'firstname':
            NomeRef.current?.focus();

            setErrorPositionAndLength({
               width: '15rem',
               height: '4.5rem',
               y: '10.2rem',
               x: '-15rem',
               actualShow: 'firstname',
               show: true,
               labelError: 'Qual seu nome?',
               isTop: false,
            });

            break;

         case 'lastname':
            SobrenomeRef.current?.focus();

            setErrorPositionAndLength({
               width: '15rem',
               height: '4.5rem',
               y: '16.2rem',
               x: '21.5rem',
               actualShow: 'lastname',
               show: true,
               labelError: 'Qual seu nome?',
               isTop: true,
            });

            break;

         case 'email':
            EmailRef.current?.focus();

            setErrorPositionAndLength({
               width: '35rem',
               height: '6rem',
               y: '15rem',
               x: '-35rem',
               actualShow: 'email',
               show: true,
               labelError:
                  'Você usará isso quando se conectar e se precisar redefinir a senha.',
               isTop: false,
            });

            break;

         case 'confirmEmail':
            ConfirmEmailRef.current?.focus();

            setErrorPositionAndLength({
               width: '30rem',
               height: '4.5rem',
               y: '20rem',
               x: '-30rem',
               actualShow: 'confirmEmail',
               show: true,
               labelError: 'Insira novamente seu endereço de email.',
               isTop: false,
            });

            break;

         case 'password':
            PasswordRef.current?.focus();

            setErrorPositionAndLength({
               width: '35rem',
               height: '8rem',
               y: emailRegex.test(email) ? '25rem' : '20rem',
               x: '-35rem',
               actualShow: 'password',
               show: true,
               labelError:
                  'Insira uma combinação de pelo menos seis números, letras, sinais de pontuação e símbolos (como ! e &).',
               isTop: false,
            });

            break;

         case 'birth':
            setErrorPositionAndLength({
               width: '35rem',
               height: '8rem',
               y: emailRegex.test(email) ? '32rem' : '27.5rem',
               x: '-35rem',
               actualShow: 'birth',
               show: true,
               labelError:
                  'Parece que você inseriu informações incorretas. Use sua data de nascimento verdadeira.',
               isTop: false,
            });

            break;

         case 'gender':
            setErrorPositionAndLength({
               width: '32.5rem',
               height: '8rem',
               y: emailRegex.test(email) ? '38.5rem' : '33.5rem',
               x: '-32.5rem',
               actualShow: 'gender',
               show: true,
               labelError:
                  'Escolha um gênero. Você poderá alterar quem pode ver isso posteriormente.',
               isTop: false,
            });

            break;

         case 'pronome':
            setErrorPositionAndLength({
               width: '20rem',
               height: '4.5rem',
               y: emailRegex.test(email) ? '43.5rem' : '38.5rem',
               x: '-20rem',
               actualShow: 'pronome',
               show: true,
               labelError: 'Selecione seu pronome.',
               isTop: false,
            });

            break;
      }
   }

   function updateInputError(field: string) {
      const newObject = { ...(CreateErrors as any) } as { [key: string]: string };

      if (newObject[field]) {
         setCreateErrors({
            ...CreateErrors,
            [field]: false,
         });
      }
   }

   function genderChangeState(field: string) {
      const newObject = { ...GenderAlternatives } as any;

      Object.entries(GenderAlternatives).map(item => {
         if (item[1]) {
            newObject[item[0]] = false;
         }
      });

      newObject[field] = true;

      setGenderAlternatives(newObject);

      if (CreateErrors.gender) {
         setCreateErrors({ ...CreateErrors, gender: false });
      }
   }

   function confirmEmail(email: string, confirmEmail: string) {
      Object.entries(CreateInput.current).map(item => {
         if (typeof item[1] === 'object') return;

         const condEmail = emailRegex.test(email) && emailRegex.test(confirmEmail);
         const condTelefone = phoneRegex.test(email) && phoneRegex.test(confirmEmail);

         const field = item[0] === 'confirmEmail';

         if ((field && condEmail) || (field && condTelefone)) {
            const condicao = email != confirmEmail;
            const newObject = { ...CreateErrors };

            condicao
               ? (newObject['confirmEmail'] = true)
               : (newObject['confirmEmail'] = false);

            setCreateErrors(newObject);
         }
      });
   }

   function resetStates() {
      let ErrorObject = {
         firstname: false,
         lastname: false,
         email: false,
         confirmEmail: false,
         password: false,
         birth: false,
         gender: false,
         pronome: false,
         userAlreadyExists: false,
         userPasswordVeryShort: false,
      };

      let InputObject = {
         firstname: '',
         lastname: '',
         email: '',
         confirmEmail: '',
         password: '',
         birth: {
            day: dayjs().date(),
            month: dayjs().month(),
            year: dayjs().year(),
         },
         gender: '',
         pronome: '',
      };

      setCreateErrors(ErrorObject);
      CreateInput.current = InputObject;
   }

   function checkErrors() {
      let containErrors = false;
      const newErrorsObject = { ...CreateErrors } as any;
      const { personalized } = GenderAlternatives;

      Object.entries(CreateInput.current).map(item => {
         if (typeof item[1] === 'object') {
            let condicao = item[1].year != dayjs().year();

            newErrorsObject[item[0]] = !condicao;

            return;
         }

         switch (item[0]) {
            case 'email':
               if (
                  emailRegex.test(item[1]) ||
                  (!isNaN(Number(item[1])) && phoneRegex.test(item[1]))
               ) {
                  newErrorsObject[item[0]] = false;
               } else {
                  newErrorsObject[item[0]] = true;
               }

               break;

            case 'confirmEmail':
               const email = CreateInput.current['email'];

               if (email.length) {
                  if (emailRegex.test(item[1]) || phoneRegex.test(item[1])) {
                     email === item[1]
                        ? (newErrorsObject[item[0]] = false)
                        : (newErrorsObject[item[0]] = true);

                     break;
                  }

                  newErrorsObject[item[0]] = true;
               }

               break;

            case 'gender':
               item[1].length
                  ? (newErrorsObject[item[0]] = false)
                  : (newErrorsObject[item[0]] = true);

               personalized && (newErrorsObject[item[0]] = false);

               break;

            case 'pronome':
               if (personalized) {
                  if (item[1].length) {
                     newErrorsObject[item[0]] = false;
                  } else {
                     newErrorsObject[item[0]] = true;
                  }
               }

               break;

            default:
               item[1].length
                  ? (newErrorsObject[item[0]] = false)
                  : (newErrorsObject[item[0]] = true);
         }
      });

      setCreateErrors(newErrorsObject);

      return containErrors;
   }

   async function createUser() {
      const { saveCookie } = Constants;
      const {
         firstname,
         lastname,
         email,
         password,
         gender,
         pronome,
         birth,
      } = CreateInput.current;

      const formatNome = (name: string) => {
         let splited = name.split(' ');
         let nameFormated = '';

         splited.map(item => {
            nameFormated += `${item.substr(0, 1).toUpperCase()}${item.substr(1)} `;
         });

         return nameFormated;
      };

      const getPronome = () => {
         switch (gender) {
            case 'Female':
               return 'Deseje a ela um feliz aniversário!';

            case 'Male':
               return 'Deseje a ele um feliz aniversário!';

            default:
               return 'Deseje a ele(a) um feliz aniversário!';
         }
      };

      const EmailOrPhone = isNaN(Number(email)) ? { email } : { phone: email };

      const body = {
         firstname: formatNome(firstname).trim(),
         lastname: formatNome(lastname).trim(),
         ...EmailOrPhone,
         password,
         sex: gender.length ? gender : 'Neutro',
         pronoun: pronome.length ? pronome : getPronome(),
         date_birth: dayjs(new Date(birth.year, birth.month, birth.day)),
      };

      try {
         await api.post('/register', body);
         const response = await api.post('/login', { ...EmailOrPhone, password });
         const { token, userId: id } = response.data;

         const user = JSON.stringify({ id, token });

         document.cookie = `user=${user}; expires=${saveCookie}`;

         router.reload();
      } catch (err) {
         switch (err.response.data.error) {
            case 'this phone already in use':
            case 'this email already in use':
               setCreateErrors({
                  ...CreateErrors,
                  userAlreadyExists: true,
               });

               break;
         }
      }
   }

   const { userAlreadyExists, userPasswordVeryShort } = CreateErrors;

   useEffect(() => {
      const dayElement = document.querySelector('#day');
      const monthElement = document.querySelector('#month');
      const yearElement = document.querySelector('#year');

      const { show, actualShow } = ErrorPositionAndLength;

      document.onclick = function (e) {
         const elementName = (e.target as any).localName as string;

         if (
            e.target === dayElement ||
            e.target === monthElement ||
            e.target === yearElement ||
            elementName === 'svg' ||
            elementName === 'path'
         )
            return;

         if (show) {
            setCreateErrors({ ...CreateErrors, [actualShow]: true });

            setErrorPositionAndLength({
               width: '15rem',
               height: '4.4rem',
               y: '',
               x: '',
               actualShow: '',
               show: false,
               labelError: '',
               isTop: false,
            });
         }
      };
   }, [ErrorPositionAndLength, CreateErrors]);

   return (
      <Blur className={ErrorPositionAndLength.show ? 'error' : ''}>
         <CreateForm
            className={GenderAlternatives.personalized ? 'personalized' : 'mobile'}
            autoComplete="false"
            onSubmit={async (e: React.FormEvent) => {
               e.preventDefault();

               const hasError = checkErrors();
               !hasError && (await createUser());
            }}
         >
            <FormHeader>
               <HeaderTitle>Cadastre-se</HeaderTitle>

               <IoMdClose
                  size={25}
                  color="#000"
                  onClick={() => {
                     setShowCreate(false);

                     resetStates();
                  }}
                  style={{
                     position: 'absolute',
                     top: 16,
                     right: 16,
                     cursor: 'pointer',
                  }}
               />

               <HeaderDescription>É rápido e fácil</HeaderDescription>
            </FormHeader>

            <Border />

            <FormInput>
               {userAlreadyExists || userPasswordVeryShort ? (
                  <AccountError>
                     <AccountErrorText>
                        {userAlreadyExists &&
                           'A conta a qual o endereço de email inserido pertence foi desativada.'}

                        {!userAlreadyExists &&
                           userPasswordVeryShort &&
                           'Escolha uma senha mais segura. Ela deve ter mais de 6 caracteres, ser \
									exclusivamente sua e difícil de adivinhar.'}
                     </AccountErrorText>
                  </AccountError>
               ) : null}

               {ErrorPositionAndLength.show && (
                  <FormularioErrorInfo
                     style={{
                        width: ErrorPositionAndLength.width,
                        height: ErrorPositionAndLength.height,
                        top: ErrorPositionAndLength.y,
                        left: ErrorPositionAndLength.x,
                     }}
                  >
                     <ErrorInfo>{ErrorPositionAndLength.labelError}</ErrorInfo>

                     <ErrorIndicator
                        className={ErrorPositionAndLength.isTop ? 'up' : 'right'}
                     />
                  </FormularioErrorInfo>
               )}

               <InputRow>
                  <CreateInputWrapper
                     className={CreateErrors.firstname ? 'create error' : 'create'}
                  >
                     <Nome
                        className={CreateErrors.firstname ? ' error' : ''}
                        placeholder="Nome"
                        type="text"
                        ref={NomeRef}
                        onChange={e => {
                           CreateInput.current['firstname'] = e.target.value;

                           updateInputError('firstname');
                        }}
                        onBlur={() => inputsBlurCheckError('firstname')}
                     />

                     {CreateErrors.firstname && (
                        <InputError left={0.5} onClick={() => showErrorInfos('firstname')} />
                     )}
                  </CreateInputWrapper>

                  <CreateInputWrapper
                     className={CreateErrors.lastname ? 'create error' : 'create'}
                  >
                     <Sobrenome
                        className={CreateErrors.lastname ? 'error' : ''}
                        placeholder="Sobrenome"
                        type="text"
                        ref={SobrenomeRef}
                        onChange={e => {
                           CreateInput.current['lastname'] = e.target.value;

                           updateInputError('lastname');
                        }}
                        onBlur={() => inputsBlurCheckError('lastname')}
                     />

                     {CreateErrors.lastname && (
                        <InputError left={0.5} onClick={() => showErrorInfos('lastname')} />
                     )}
                  </CreateInputWrapper>
               </InputRow>

               <CreateInputWrapper className={CreateErrors.email ? 'error' : ''}>
                  <Email
                     className={CreateErrors.email ? 'create error' : 'create'}
                     placeholder="Celular ou email"
                     ref={EmailRef}
                     onChange={e => {
                        CreateInput.current['email'] = e.target.value;

                        updateInputError('email');

                        if (
                           !emailRegex.test(e.target.value) &&
                           !phoneRegex.test(e.target.value)
                        ) {
                           ConfirmEmailRef.current && (ConfirmEmailRef.current.value = '');

                           CreateInput.current.confirmEmail = '';

                           setShowConfirmEmail(false);

                           if (CreateErrors['confirmEmail']) {
                              setCreateErrors({
                                 ...CreateErrors,
                                 confirmEmail: false,
                              });
                           }

                           return;
                        }

                        !ShowConfirmEmail && setShowConfirmEmail(true);

                        confirmEmail(e.target.value, CreateInput.current.confirmEmail);
                     }}
                     onBlur={() => inputsBlurCheckError('email')}
                  />

                  {CreateErrors.email && (
                     <InputError left={1.4} onClick={() => showErrorInfos('email')} />
                  )}
               </CreateInputWrapper>

               {ShowConfirmEmail && (
                  <CreateInputWrapper className={CreateErrors.confirmEmail ? 'error' : ''}>
                     <Email
                        className={CreateErrors.confirmEmail ? 'create error' : 'create'}
                        placeholder="insira o email novamente"
                        ref={ConfirmEmailRef}
                        onChange={e => {
                           CreateInput.current['confirmEmail'] = e.target.value;

                           confirmEmail(CreateInput.current.email, e.target.value);
                           updateInputError('confirmEmail');
                        }}
                        onBlur={() => inputsBlurCheckError('confirmEmail')}
                     />

                     {CreateErrors.confirmEmail && (
                        <InputError
                           left={1.4}
                           onClick={() => showErrorInfos('confirmEmail')}
                        />
                     )}
                  </CreateInputWrapper>
               )}

               <CreateInputWrapper className={CreateErrors.password ? 'error' : ''}>
                  <Password
                     className={CreateErrors.password ? 'create error' : 'create'}
                     placeholder="Nova senha"
                     type="password"
                     ref={PasswordRef}
                     onChange={e => {
                        CreateInput.current['password'] = e.target.value;

                        updateInputError('password');
                     }}
                     onBlur={() => inputsBlurCheckError('password')}
                  />

                  {CreateErrors.password && (
                     <InputError left={1.4} onClick={() => showErrorInfos('password')} />
                  )}
               </CreateInputWrapper>

               <Row>
                  <p
                     style={{
                        marginTop: '1.5rem',
                        fontSize: '1.3rem',
                     }}
                  >
                     Data de nascimento
                  </p>

                  {CreateErrors.birth && (
                     <InputError right={1.5} top={1} onClick={() => showErrorInfos('birth')} />
                  )}
               </Row>

               <DataOfBirth>
                  <Day
                     id="day"
                     className={CreateErrors.birth ? 'error' : ''}
                     onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        CreateInput.current['birth']['day'] = Number(e.target.value);

                        updateInputError('birth');
                     }}
                  >
                     {days.map(item => {
                        return (
                           <Option
                              key={item + item * 2}
                              selected={item === dayjs().date()}
                              value={item}
                           >
                              {item}
                           </Option>
                        );
                     })}
                  </Day>

                  <Month
                     id="month"
                     className={CreateErrors.birth ? 'error' : ''}
                     onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        CreateInput.current['birth']['month'] = Number(e.target.value);

                        updateInputError('birth');
                     }}
                  >
                     {months.map((item, number) => {
                        return (
                           <Option
                              key={number * 3}
                              selected={item == months[dayjs().month()]}
                              value={number}
                           >
                              {item}
                           </Option>
                        );
                     })}
                  </Month>

                  <Year
                     id="year"
                     className={CreateErrors.birth ? 'error' : ''}
                     onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        CreateInput.current['birth']['year'] = Number(e.target.value);

                        updateInputError('birth');
                     }}
                  >
                     {years.reverse().map(item => {
                        return (
                           <Option
                              key={item * item + 2}
                              selected={item === dayjs().year()}
                              value={item}
                           >
                              {item}
                           </Option>
                        );
                     })}
                  </Year>
               </DataOfBirth>

               <Row style={{ marginTop: '0.4rem' }}>
                  <p
                     style={{
                        marginTop: '0.4rem',
                        fontSize: '1.3rem',
                     }}
                  >
                     Genero
                  </p>

                  {CreateErrors.gender && (
                     <InputError
                        right={1.5}
                        top={0}
                        onClick={() => showErrorInfos('gender')}
                     />
                  )}
               </Row>

               <Gender>
                  <GenderOption
                     className={CreateErrors.gender ? 'error woman' : 'woman'}
                     onClick={() => {
                        CreateInput.current['gender'] = 'Female';

                        genderChangeState('female');
                     }}
                  >
                     <GenderText>Feminino</GenderText>

                     <Checkbox
                        checked={CreateInput.current.gender === 'Female'}
                        onChange={() => {
                           CreateInput.current['gender'] = 'Female';

                           genderChangeState('female');
                        }}
                     />
                  </GenderOption>

                  <GenderOption
                     className={CreateErrors.gender ? 'error male' : 'male'}
                     onClick={() => {
                        CreateInput.current['gender'] = 'Male';

                        genderChangeState('male');
                     }}
                  >
                     <GenderText>Masculino</GenderText>

                     <Checkbox
                        checked={CreateInput.current.gender === 'Male'}
                        onChange={() => {
                           CreateInput.current['gender'] = 'Male';

                           genderChangeState('male');
                        }}
                     />
                  </GenderOption>

                  <GenderOption
                     onClick={() => genderChangeState('personalized')}
                     className={CreateErrors.gender ? 'error personalized' : 'personalized'}
                  >
                     <GenderText>Personalizado</GenderText>

                     <Checkbox
                        checked={GenderAlternatives['personalized']}
                        onChange={() => {}}
                     />
                  </GenderOption>
               </Gender>

               {GenderAlternatives['personalized'] && (
                  <>
                     <WrapperPronome>
                        <PronomePersonalized
                           className={CreateErrors.pronome ? 'error' : ''}
                           onChange={e => (CreateInput.current['pronome'] = e.target.value)}
                        >
                           <Option selected disabled>
                              Selecione seu pronome
                           </Option>

                           <Option value="Female">
                              Feminino: "Deseje a ela um feliz aniversário!"
                           </Option>

                           <Option value="Male">
                              Masculino: "Deseje a ele um feliz aniversário!"
                           </Option>

                           <Option value="Neutro">
                              Neutro: "Deseje a ele(a) um feliz aniversário!"
                           </Option>
                        </PronomePersonalized>

                        {CreateErrors.pronome && (
                           <InputError
                              pronome
                              top={0.9}
                              right={1.8}
                              onClick={() => showErrorInfos('pronome')}
                           />
                        )}
                     </WrapperPronome>

                     <p
                        style={{
                           marginTop: '0.4rem',
                           marginBottom: '0.6rem',
                           fontSize: '1.3rem',
                        }}
                     >
                        O seu pronome fica visível para todos.
                     </p>

                     <CreateInputWrapper>
                        <InputGender
                           placeholder="Genero (opcional)"
                           onChange={e => (CreateInput.current['gender'] = e.target.value)}
                        />
                     </CreateInputWrapper>
                  </>
               )}

               <Termos>
                  Ao clicar em Cadastre-se, você concorda com nossos <b>Termos</b>,{' '}
                  <b>Política de Dados</b> e <b>Política de Cookies</b>. Você poderá receber
                  notificações por SMS e cancelar isso quando quiser.
               </Termos>

               <Center>
                  <Submit type="submit">Cadastre-se</Submit>
               </Center>
            </FormInput>
         </CreateForm>
      </Blur>
   );
};

export default FormCreate;
