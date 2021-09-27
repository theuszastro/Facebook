import { describe, test, expect, beforeAll, beforeEach } from '@jest/globals';
import request from 'supertest';

import { join } from 'path';

import { v4 } from 'uuid';

import { clear, connection } from './utils/database';
import app from '../src/app';

import { createFriend, createLogin, createUser } from './utils/functions/User';
import { createPost } from './utils/functions/Post';
import { createToken } from './utils/functions/Token';

const api = request(app);

const image = join(__dirname, 'images/teste.jpeg');

describe('Testing all functionality of Post', () => {
   beforeAll(async () => await connection());
   beforeEach(async () => await clear());

   describe('Get posts by user', () => {
      test('it should not get posts without token', async () => {
         const response = await api.get('/posts');

         expect(response.status).toBe(402);
         expect(response.body).toEqual({ error: 'token is necessary' });
      });

      test('it should not get posts if user not exist', async () => {
         const response = await api
            .get('/posts')
            .set('authorization', `Bearer ${createToken()}`);

         expect(response.status).toBe(400);
         expect(response.body).toEqual({ error: 'this user not exist' });
      });

      test('it should get posts', async () => {
         const { User01, User02 } = await createFriend(api);

         await createPost(api, { token: User02.body.token });

         const response = await api
            .get('/posts')
            .set('authorization', `Bearer ${User01.body.token}`);

         expect(response.body.totalPages).toBe(1);
         expect(response.body.posts).toHaveLength(1);
      });
   });

   describe('Get post data by id', () => {
      test('it should not return data of post with id not valid', async () => {
         const response = await api.get('/post/ggg');

         expect(response.status).toBe(400);
         expect(response.body).toEqual({ error: 'this id is not valid' });
      });

      test('it should not return data of post not exist', async () => {
         const response = await api.get(`/post/${v4()}`);

         expect(response.status).toBe(400);
         expect(response.body).toEqual({ error: 'this post not exist' });
      });

      test('it should return data of post', async () => {
         await createUser(api);
         const User = await createLogin(api);

         const Post = await createPost(api, { token: User.body.token });
         const response = await api.get(`/post/${Post.body.id}`);

         expect(response.status).toBe(200);
         expect(response.body).toMatchObject(expect.objectContaining({ description: 'Alo' }));
      });
   });

   describe('Creating post', () => {
      test('it should not create post if user not exist', async () => {
         const response = await createPost(api, { token: createToken() });

         expect(response.status).toBe(400);
         expect(response.body).toEqual({ error: 'this user not exist' });
      });

      test('it should not create post without token', async () => {
         const response = await createPost(api);

         expect(response.status).toBe(402);
         expect(response.body).toEqual({ error: 'token is necessary' });
      });

      test('it should not create post with data not valid', async () => {
         await createUser(api);
         const User = await createLogin(api);

         const response = await createPost(api, { randomField: true, token: User.body.token });

         expect(response.status).toBe(402);
         expect(response.body).toEqual({ error: 'this data is not valid' });
      });

      test('it should create post', async () => {
         await createUser(api);
         const User = await createLogin(api);

         const withoutImage = await createPost(api, { token: User.body.token });
         const withImage = await createPost(api, { token: User.body.token, withFile: true });

         expect(withoutImage.status).toBe(201);
         expect(withoutImage.body).toHaveProperty('id');
         expect(withoutImage.body).toHaveProperty('media');

         expect(withImage.status).toBe(201);
         expect(withImage.body).toHaveProperty('id');
         expect(withImage.body).toHaveProperty('media');
      });
   });

   describe('Update post', () => {
      const body = { description: 'updated' };

      test('it should not update post with id not valid', async () => {
         await createUser(api);

         const User = await createLogin(api);
         const response = await api
            .put('/post/1')
            .send(body)
            .set('authorization', `Bearer ${User.body.token}`);

         expect(response.status).toBe(400);
         expect(response.body).toEqual({ error: 'this id is not valid' });
      });

      test('it should not update post with user not exist', async () => {
         await createUser(api);

         const User = await createLogin(api);
         const Post = await createPost(api, { token: User.body.token });

         const response = await api
            .put(`/post/${Post.body.id}`)
            .send(body)
            .set('authorization', `Bearer ${createToken()}`);

         expect(response.status).toBe(400);
         expect(response.body).toEqual({ error: 'this user not exist' });
      });

      test('it should not update post without token', async () => {
         await createUser(api);

         const User = await createLogin(api);
         const Post = await createPost(api, { token: User.body.token });

         const response = await api.put(`/post/${Post.body.id}`).send(body);

         expect(response.status).toBe(402);
         expect(response.body).toEqual({ error: 'token is necessary' });
      });

      test('it should not update post if post not exist', async () => {
         await createUser(api);

         const User = await createLogin(api);

         const response = await api
            .put(`/post/${v4()}`)
            .send(body)
            .set('authorization', `Bearer ${User.body.token}`);

         expect(response.status).toBe(400);
         expect(response.body).toEqual({ error: 'this post not exist' });
      });

      test('it should not update post with data not valid', async () => {
         await createUser(api);

         const User = await createLogin(api);
         const Post = await createPost(api, { token: User.body.token });

         const response = await api
            .put(`/post/${Post.body.id}`)
            .set('authorization', `Bearer ${User.body.token}`)
            .send({ random: 'klnadokjawçjl', lajdwaklkdiaw: 'lkjnfalmkwda' });

         expect(response.status).toBe(402);
         expect(response.body).toEqual({ error: 'this data is not valid' });
      });

      test('it should not update post if not owner', async () => {
         await createUser(api);
         await createUser(api, { isPhone: true });

         const UserEmail = await createLogin(api);
         const UserPhone = await createLogin(api, { isPhone: true });

         const Post = await createPost(api, { token: UserEmail.body.token });

         const response = await api
            .put(`/post/${Post.body.id}`)
            .set('authorization', `Bearer ${UserPhone.body.token}`)
            .send(body);

         expect(response.status).toBe(401);
         expect(response.body).toEqual({ error: 'you not have permission for to follow' });
      });

      test('it should update post', async () => {
         await createUser(api);

         const User = await createLogin(api);

         const Post01 = await createPost(api, { token: User.body.token });
         const Post02 = await createPost(api, { token: User.body.token, withFile: true });

         const Post01Update = await api
            .put(`/post/${Post01.body.id}`)
            .set('authorization', `Bearer ${User.body.token}`)
            .field('description', body.description)
            .attach('image', image);

         const Post02Update = await api
            .put(`/post/${Post02.body.id}`)
            .set('authorization', `Bearer ${User.body.token}`)
            .field('oldFiles', [Post02.body.media[0].id])
            .attach('image', image)
            .attach('image', image);

         expect(Post01Update.status).toBe(200);
         expect(Post01Update.body).toMatchObject(expect.objectContaining(body));
         expect(Post01Update.body.media).toHaveLength(1);

         expect(Post02Update.status).toBe(200);
         expect(Post02Update.body.media).toHaveLength(3);
      });
   });

   describe('Deleting post', () => {
      test('it should not delete post with id not valid', async () => {
         await createUser(api);

         const User = await createLogin(api);

         const response = await api
            .delete('/post/1')
            .set('authorization', `Bearer ${User.body.token}`);

         expect(response.status).toBe(400);
         expect(response.body).toEqual({ error: 'this id is not valid' });
      });

      test('it should not delete post with user not exist', async () => {
         await createUser(api);

         const User = await createLogin(api);
         const Post = await createPost(api, { token: User.body.token });

         const response = await api
            .delete(`/post/${Post.body.id}`)
            .set('authorization', `Bearer ${createToken()}`);

         expect(response.status).toBe(400);
         expect(response.body).toEqual({ error: 'this user not exist' });
      });

      test('it should not delete post without token', async () => {
         await createUser(api);

         const User = await createLogin(api);
         const Post = await createPost(api, { token: User.body.token });

         const response = await api.delete(`/post/${Post.body.id}`);

         expect(response.status).toBe(402);
         expect(response.body).toEqual({ error: 'token is necessary' });
      });

      test('it should not delete post if not owner', async () => {
         await createUser(api);
         await createUser(api, { isPhone: true });

         const UserEmail = await createLogin(api);
         const UserPhone = await createLogin(api, { isPhone: true });

         const Post = await createPost(api, { token: UserEmail.body.token });

         const response = await api
            .delete(`/post/${Post.body.id}`)
            .set('authorization', `Bearer ${UserPhone.body.token}`);

         expect(response.status).toBe(401);
         expect(response.body).toEqual({ error: 'you not have permission for to follow' });
      });

      test('it should delete post', async () => {
         await createUser(api);

         const User = await createLogin(api);
         const Post = await createPost(api, { token: User.body.token });

         const response = await api
            .delete(`/post/${Post.body.id}`)
            .set('authorization', `Bearer ${User.body.token}`);

         const getPost = await api.get(`/post/${Post.body.id}`);

         expect(response.status).toBe(200);
         expect(response.body).toEqual({});

         expect(getPost.status).toBe(400);
         expect(getPost.body).toEqual({ error: 'this post not exist' });
      });
   });
});
