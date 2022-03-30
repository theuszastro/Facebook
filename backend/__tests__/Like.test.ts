import { describe, test, expect, beforeEach } from '@jest/globals';
import request from 'supertest';

import { v4 } from 'uuid';

import app from '../src/app';

import { clear } from './utils/database';

import { createToken } from './utils/functions/Token';
import { createLogin, createUser } from './utils/functions/User';
import { createPost } from './utils/functions/Post';

const api = request(app);

describe('Testing all functionality of likes', () => {
	beforeEach(async () => await clear());

	describe('Testing likes in posts', () => {
		test('it should not create like without token', async () => {
			const response = await api.post('/like');

			expect(response.status).toBe(401);
			expect(response.body).toEqual({ error: 'token is necessary' });
		});

		test('it should not create like if user not exists', async () => {
			const response = await api
				.post('/like')
				.set('authorization', `Bearer ${createToken()}`);

			expect(response.status).toBe(400);
			expect(response.body).toEqual({ error: 'this user not exist' });
		});

		test('it should not create like if post not exists', async () => {
			await createUser(api);
			const user = await createLogin(api);

			const response = await api
				.post('/like')
				.send({ post: v4(), reaction: 'like' })
				.set('authorization', `Bearer ${user.body.token}`);

			expect(response.status).toBe(400);
			expect(response.body).toEqual({ error: 'this post not exist' });
		});

		test('it should not create like with data invalid', async () => {
			await createUser(api);
			const user = await createLogin(api);

			const response = await api
				.post('/like')
				.set('authorization', `Bearer ${user.body.token}`);

			const response01 = await api
				.post('/like')
				.send({ post1: '', reaction1: 'adwa' })
				.set('authorization', `Bearer ${user.body.token}`);

			expect(response.status).toBe(400);
			expect(response01.status).toBe(400);

			expect(response.body).toEqual({ error: 'this data is not valid' });
			expect(response01.body).toEqual({ error: 'this data is not valid' });
		});

		test('it should create like', async () => {
			await createUser(api);
			const user = await createLogin(api);

			const post = await createPost(api, { token: user.body.token });

			const response = await api
				.post('/like')
				.send({ post: post.body.id, reaction: 'like' })
				.set('authorization', `Bearer ${user.body.token}`);

			const response01 = await api
				.post('/like')
				.send({ post: post.body.id, reaction: 'uau' })
				.set('authorization', `Bearer ${user.body.token}`);

			expect(response.status).toBe(201);
			expect(response01.status).toBe(201);

			expect(response.body).toMatchObject(expect.objectContaining({ reaction: 'like' }));
			expect(response01.body).toMatchObject(expect.objectContaining({ reaction: 'uau' }));
		});

		test('it should delete like ', async () => {
			await createUser(api);
			const user = await createLogin(api);
			const post = await createPost(api, { token: user.body.token });

			const like = await api
				.post('/like')
				.send({ post: post.body.id, reaction: 'like' })
				.set('authorization', `Bearer ${user.body.token}`);

			const response = await api
				.delete(`/like/${like.body.id}`)
				.set('authorization', `Bearer ${user.body.token}`);

			expect(response.status).toBe(200);
			expect(response.body).toEqual({});
		});
	});
});
