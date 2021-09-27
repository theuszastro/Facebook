import { expect, describe, test, beforeEach } from '@jest/globals';
import { clear } from './utils/database';

import request from 'supertest';
import { v4 } from 'uuid';

import app from '../src/app';

import { createToken } from './utils/functions/Token';
import { createLogin, createUser } from './utils/functions/User';
import { createSolicitation } from './utils/functions/Solicitation';

const api = request(app);

describe('Testing all functionality of friend', () => {
   beforeEach(async () => await clear());

   describe('Get friends', () => {
      test('it should not return friends without token', async () => {
         const response = await api.get('/friends');

         expect(response.status).toBe(402);
         expect(response.body).toEqual({ error: 'token is necessary' });
      });

      test('it should not return friends if user not exist', async () => {
         const response = await api
            .get('/friends')
            .set('authorization', `Bearer ${createToken()}`);

         expect(response.status).toBe(400);
         expect(response.body).toEqual({ error: 'this user not exist' });
      });

      test('it should return friends', async () => {
         await createUser(api);

         const User = await createLogin(api);

         const response = await api
            .get('/friends')
            .set('authorization', `Bearer ${User.body.token}`);

         expect(response.status).toBe(200);
         expect(response.body).toHaveLength(0);
      });
   });

   describe('Creating friend', () => {
      test('it should create friend', async () => {
         await createUser(api);
         await createUser(api, { isPhone: true });

         const User01 = await createLogin(api);
         const User02 = await createLogin(api, { isPhone: true });

         const soli = await createSolicitation(api, {
            withToken: true,
            token: User01.body.token,
            toUser: User02.body.userId,
         });

         await api
            .put(`/solicitation/${soli.body.id}`)
            .set('authorization', `Bearer ${User02.body.token}`)
            .send({ status: 'Accepted' });

         const response = await api
            .get('/friends')
            .set('authorization', `Bearer ${User01.body.token}`);

         expect(response.status).toBe(200);
         expect(response.body).toHaveLength(1);
      });
   });

   describe('Delete friend', () => {
      test('it should not delete friend without token', async () => {
         const response = await api.delete(`/friend/${v4()}`);

         expect(response.status).toBe(402);
         expect(response.body).toEqual({ error: 'token is necessary' });
      });

      test('it should not delete friend if user not exist', async () => {
         const response = await api
            .delete(`/friend/${v4()}`)
            .set('authorization', `Bearer ${createToken()}`);

         expect(response.status).toBe(400);
         expect(response.body).toEqual({ error: 'this user not exist' });
      });

      test('it should not delete friend if friend not exist', async () => {
         await createUser(api);

         const User = await createLogin(api);

         const response = await api
            .delete(`/friend/${v4()}`)
            .set('authorization', `Bearer ${User.body.token}`);

         expect(response.status).toBe(400);
         expect(response.body).toEqual({ error: 'this friend not exist' });
      });

      test('it should not delete friend of other user', async () => {
         await createUser(api);
         await createUser(api, { isPhone: true });
         await createUser(api, { initialData: { email: 'email@example.com' } });

         const User01 = await createLogin(api);
         const User02 = await createLogin(api, { isPhone: true });
         const User03 = await createLogin(api, {
            initialData: { email: 'email@example.com' },
         });

         const soli = await createSolicitation(api, {
            withToken: true,
            token: User01.body.token,
            toUser: User02.body.userId,
         });

         await api
            .put(`/solicitation/${soli.body.id}`)
            .send({ status: 'Accepted' })
            .set('authorization', `Bearer ${User02.body.token}`);

         const friend = await api
            .get('/friends')
            .set('authorization', `Bearer ${User02.body.token}`);

         const response = await api
            .delete(`/friend/${friend.body[0].id}`)
            .set('authorization', `Bearer ${User03.body.token}`);

         expect(response.status).toBe(401);
         expect(response.body).toEqual({ error: 'you not have permission for to follow' });
      });

      test('it should delete friend', async () => {
         await createUser(api);
         await createUser(api, { isPhone: true });

         const User01 = await createLogin(api);
         const User02 = await createLogin(api, { isPhone: true });

         const soli = await createSolicitation(api, {
            withToken: true,
            token: User01.body.token,
            toUser: User02.body.userId,
         });

         await api
            .put(`/solicitation/${soli.body.id}`)
            .send({ status: 'Accepted' })
            .set('authorization', `Bearer ${User02.body.token}`);

         const friend = await api
            .get('/friends')
            .set('authorization', `Bearer ${User02.body.token}`);

         const response = await api
            .delete(`/friend/${friend.body[0].id}`)
            .set('authorization', `Bearer ${User01.body.token}`);

         expect(response.status).toBe(200);
         expect(response.body).toEqual({});
      });
   });
});
