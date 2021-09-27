import { SuperTest, Test } from 'supertest';
import dayjs from 'dayjs';

import defaultValues from '../values/User';
import { GetUserProps, CreateUserProps, LoginUserProps } from '../interfaces/User';
import { createSolicitation } from './Solicitation';

const { defaultFirstname, defaultLastname, defaultEmail, defaultPhone } = defaultValues;

export async function getUser(api: SuperTest<Test>, data = {} as GetUserProps) {
   const { initialData = {} } = data;
   const { token, userId } = initialData;

   if (initialData) {
      if (userId && token) {
         return await api.get(`/user/${userId}`).set('authorization', `Bearer ${token}`);
      }
   }

   const response = await createLogin(api);

   return await api
      .get(`/user/${userId ?? response.body.userId}`)
      .set('authorization', `Bearer ${token ?? response.body.token}`);
}

export async function createUser(api: SuperTest<Test>, data = {} as CreateUserProps) {
   const { isPhone, initialData } = data;

   const user = {
      firstname: defaultFirstname,
      lastname: defaultLastname,
      sex: 'Male',
      pronoun: 'Male',
      ...(isPhone ? { phone: defaultPhone } : { email: defaultEmail }),
      password: '123456',
      date_birth: dayjs(new Date(2004, 5, 2)).format(),
      ...(initialData && { ...initialData }),
   };

   return await api.post('/register').send(user);
}

export async function createLogin(api: SuperTest<Test>, data = {} as LoginUserProps) {
   const { isPhone, initialData } = data;

   const user = {
      ...(isPhone ? { phone: defaultPhone } : { email: defaultEmail }),
      password: '123456',
      ...(initialData && { ...initialData }),
   };

   return await api.post('/login').send(user);
}

export async function createFriend(api: SuperTest<Test>) {
   await createUser(api);
   await createUser(api, { isPhone: true });

   const User01 = await createLogin(api);
   const User02 = await createLogin(api, { isPhone: true });

   const soli = await createSolicitation(api, {
      withToken: true,
      token: User02.body.token,
      toUser: User01.body.userId,
   });

   await api
      .put(`/solicitation/${soli.body.id}`)
      .set('authorization', `Bearer ${User01.body.token}`)
      .send({ status: 'Accepted' });

   return { User01, User02 };
}
