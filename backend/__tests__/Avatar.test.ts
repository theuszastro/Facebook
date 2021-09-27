import { describe, test, expect, beforeEach } from '@jest/globals';
import request from 'supertest';

import { createUser, createLogin } from './utils/functions/User';

import { clear } from './utils/database';

import app from '../src/app';

import { join } from 'path';
import { v4 } from 'uuid';

const image = join(__dirname, 'images/teste.jpeg');
const svg = join(__dirname, 'images/svg.svg');
const api = request(app);

describe('Testing all functionality of avatars', () => {
   beforeEach(async () => await clear());

   describe('upload of avatar', () => {
      test('it should not save image without token', async () => {
         const response = await api.post('/avatar').attach('avatar', image);

         expect(response.status).toBe(402);
         expect(response.body).toEqual({ error: 'token is necessary' });
      });

      test('it should not save image with mimetype not supported', async () => {
         const response = await api.post('/avatar').attach('avatar', svg);

         expect(response.status).toBe(400);
         expect(response.body).toEqual({ error: 'this format of file not is supported' });
      });

      test('it should not save image with route not support file', async () => {
         await createUser(api);

         const User = await createLogin(api);
         const response = await api
            .post('/avatar/reupload')
            .set('authorization', `Bearer ${User.body.token}`)
            .attach('avatar', image);

         expect(response.status).toBe(400);
         expect(response.body).toEqual({ error: 'this route not support uploading files' });
      });

      test('it should save image', async () => {
         await createUser(api);

         const user = await createLogin(api);
         const response = await api
            .post('/avatar')
            .set('authorization', `Bearer ${user.body.token}`)
            .attach('avatar', image);

         expect(response.status).toBe(201);
         expect(response.body).toHaveProperty('id');
      });

      test('it should save repeated image', async () => {
         await createUser(api);

         const user = await createLogin(api);
         const firstImage = await api
            .post('/avatar')
            .set('Content-Type', 'multipart/form-data')
            .set('authorization', `Bearer ${user.body.token}`)
            .attach('avatar', image);

         const twoImage = await api
            .post('/avatar')
            .set('authorization', `Bearer ${user.body.token}`)
            .attach('avatar', image);

         expect(firstImage.status).toBe(201);
         expect(firstImage.body).toHaveProperty('id');

         expect(twoImage.status).toBe(201);
         expect(twoImage.body).toHaveProperty('id');
      });
   });

   describe('Reupload of avatar', () => {
      test('it should not reupload image with invalid id of avatar', async () => {
         await createUser(api);

         const User = await createLogin(api);
         const response = await api
            .post(`/avatar/reupload`)
            .set('authorization', `Bearer ${User.body.token}`)
            .send({ id: v4() });

         expect(response.status).toBe(400);
         expect(response.body).toEqual({ error: 'this avatar is not uploaded' });
      });

      test('it should not reupload image without id of avatar', async () => {
         await createUser(api);

         const User = await createLogin(api);
         const response = await api
            .post(`/avatar/reupload`)
            .set('authorization', `Bearer ${User.body.token}`);

         expect(response.status).toBe(402);
         expect(response.body).toEqual({ error: 'this data is not valid' });
      });

      test('it should reupload image', async () => {
         await createUser(api);

         const User = await createLogin(api);
         const upload = await api
            .post('/avatar')
            .set('authorization', `Bearer ${User.body.token}`)
            .attach('avatar', image);

         const response = await api
            .post(`/avatar/reupload`)
            .set('authorization', `Bearer ${User.body.token}`)
            .send({ id: upload.body.id });

         expect(response.status).toBe(201);
         expect(response.body).toEqual({});
      });
   });
});
