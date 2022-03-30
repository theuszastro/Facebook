import { describe, test, expect, beforeEach } from '@jest/globals';
import request from 'supertest';

import { v4 } from 'uuid';

import app from '../src/app';

import { clear } from './utils/database';

import { createLogin, createUser } from './utils/functions/User';
import { createToken } from './utils/functions/Token';
import { createSolicitation } from './utils/functions/Solicitation';

const api = request(app);

describe('Testing all functionality of solicitation', () => {
	beforeEach(async () => await clear());

	describe('Get solicitation', () => {
		test('it should not return data of solicitation without token', async () => {
			const response = await api.get('/solicitations');

			expect(response.status).toBe(401);
			expect(response.body).toEqual({ error: 'token is necessary' });
		});

		test('it should not return data of solicitation if user not exist', async () => {
			const response = await api
				.get('/solicitations')
				.set('authorization', `Bearer ${createToken()}`);

			expect(response.status).toBe(400);
			expect(response.body).toEqual({ error: 'this user not exist' });
		});

		test('it should return data of solicitation ', async () => {
			await createUser(api);
			await createUser(api, { isPhone: true });

			const User01 = await createLogin(api);
			const User02 = await createLogin(api, { isPhone: true });

			await createSolicitation(api, {
				withToken: true,
				token: User02.body.token,
				toUser: User01.body.userId,
			});

			const response = await api
				.get('/solicitations')
				.set('authorization', `Bearer ${User01.body.token}`);

			expect(response.status).toBe(200);
			expect(response.body).toHaveLength(1);
		});
	});

	describe('Creating solicitation', () => {
		test('it should not create solicitation without token', async () => {
			const response = await api.post('/solicitation').send({ to: v4() });

			expect(response.status).toBe(401);
			expect(response.body).toEqual({ error: 'token is necessary' });
		});

		test('it should not create solicitation if user not exist', async () => {
			const response = await api
				.post('/solicitation')
				.set('authorization', `Bearer ${createToken()}`);

			expect(response.status).toBe(400);
			expect(response.body).toEqual({ error: 'this user not exist' });
		});

		test('it should not create solicitation if the remitter not exist', async () => {
			await createUser(api);
			const User = await createLogin(api);

			const response = await createSolicitation(api, {
				withToken: true,
				token: User.body.token,
			});

			expect(response.status).toBe(400);
			expect(response.body).toEqual({ error: 'this user not exist' });
		});

		test('it should not create solicitation with data invalid', async () => {
			await createUser(api);
			const User = await createLogin(api);

			const response = await createSolicitation(api, {
				withToken: true,
				randomFields: true,
				token: User.body.token,
			});

			expect(response.status).toBe(400);
			expect(response.body).toEqual({ error: 'this data is not valid' });
		});

		test('it should not create solicitation if already was sent', async () => {
			await createUser(api);
			await createUser(api, { isPhone: true });

			const User01 = await createLogin(api);
			const User02 = await createLogin(api, { isPhone: true });

			const response = await createSolicitation(api, {
				withToken: true,
				token: User01.body.token,
				toUser: User02.body.userId,
			});

			const alreadySent = await createSolicitation(api, {
				withToken: true,
				token: User01.body.token,
				toUser: User02.body.userId,
			});

			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty('id');

			expect(alreadySent.status).toBe(401);
			expect(alreadySent.body).toEqual({
				error: 'you already sent solicitation for this user',
			});
		});

		test('it should create solicitation', async () => {
			await createUser(api);
			await createUser(api, { isPhone: true });

			const User01 = await createLogin(api);
			const User02 = await createLogin(api, { isPhone: true });

			const response = await createSolicitation(api, {
				withToken: true,
				token: User01.body.token,
				toUser: User02.body.userId,
			});

			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty('id');
		});
	});

	describe('Update solicitation', () => {
		test('it should not update solicitation without token', async () => {
			await createUser(api);
			await createUser(api, { isPhone: true });

			const User01 = await createLogin(api);
			const User02 = await createLogin(api, { isPhone: true });

			const soli = await createSolicitation(api, {
				withToken: true,
				token: User01.body.token,
				toUser: User02.body.userId,
			});

			const response = await api.put(`/solicitation/${soli.body.id}`);

			expect(response.status).toBe(401);
			expect(response.body).toEqual({ error: 'token is necessary' });
		});

		test('it should not update solicitation if user not exist', async () => {
			await createUser(api);
			await createUser(api, { isPhone: true });

			const User01 = await createLogin(api);
			const User02 = await createLogin(api, { isPhone: true });

			const soli = await createSolicitation(api, {
				withToken: true,
				token: User01.body.token,
				toUser: User02.body.userId,
			});

			const response = await api
				.put(`/solicitation/${soli.body.id}`)
				.set('authorization', `Bearer ${createToken()}`);

			expect(response.status).toBe(400);
			expect(response.body).toEqual({ error: 'this user not exist' });
		});

		test('it should not update solicitation if not exist', async () => {
			await createUser(api);

			const User = await createLogin(api);

			const response = await api
				.put(`/solicitation/${v4()}`)
				.set('authorization', `Bearer ${User.body.token}`)
				.send({ status: 'Accepted' });

			expect(response.status).toBe(400);
			expect(response.body).toEqual({ error: 'this solicitation not exist' });
		});

		test('it should not update solicitation with data invalid', async () => {
			await createUser(api);
			await createUser(api, { isPhone: true });

			const User01 = await createLogin(api);
			const User02 = await createLogin(api, { isPhone: true });

			const soli = await createSolicitation(api, {
				withToken: true,
				token: User01.body.token,
				toUser: User02.body.userId,
			});

			const response = await api
				.put(`/solicitation/${soli.body.id}`)
				.set('authorization', `Bearer ${User02.body.token}`)
				.send({ from: '' });

			const response01 = await api
				.put(`/solicitation/${soli.body.id}`)
				.set('authorization', `Bearer ${User02.body.token}`)
				.send({ status: 'Qauqluerporra' });

			expect(response.status).toBe(400);
			expect(response.body).toEqual({ error: 'this data is not valid' });

			expect(response01.status).toBe(400);
			expect(response01.body).toEqual({ error: 'this data is not valid' });
		});

		test('it should not update if user is not recipient', async () => {
			await createUser(api);
			await createUser(api, { isPhone: true });

			const User01 = await createLogin(api);
			const User02 = await createLogin(api, { isPhone: true });

			const soli = await createSolicitation(api, {
				withToken: true,
				token: User01.body.token,
				toUser: User02.body.userId,
			});

			const response = await api
				.put(`/solicitation/${soli.body.id}`)
				.set('authorization', `Bearer ${User01.body.token}`)
				.send({ status: 'Accepted' });

			expect(response.status).toBe(401);
			expect(response.body).toEqual({ error: 'you not have permission for to follow' });
		});

		test('it should not update solicitation if already accepted/declined', async () => {
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
				.put(`/solicitation/${soli.body.id}`)
				.set('authorization', `Bearer ${User02.body.token}`)
				.send({ status: 'Accepted' });

			expect(response.status).toBe(401);
			expect(response.body).toEqual({
				error: 'you already accepted/declined this solicitation',
			});
		});

		test('it should update solicitation', async () => {
			await createUser(api);
			await createUser(api, { isPhone: true });

			const User01 = await createLogin(api);
			const User02 = await createLogin(api, { isPhone: true });

			const soli = await createSolicitation(api, {
				withToken: true,
				token: User01.body.token,
				toUser: User02.body.userId,
			});

			const response = await api
				.put(`/solicitation/${soli.body.id}`)
				.set('authorization', `Bearer ${User02.body.token}`)
				.send({ status: 'Accepted' });

			expect(response.status).toBe(200);
			expect(response.body).toMatchObject(expect.objectContaining({ status: 'Accepted' }));
		});
	});

	describe('Delete solicitation', () => {
		test('it should not delete without token', async () => {
			await createUser(api);
			await createUser(api, { isPhone: true });

			const User01 = await createLogin(api);
			const User02 = await createLogin(api, { isPhone: true });

			const soli = await createSolicitation(api, {
				withToken: true,
				token: User01.body.token,
				toUser: User02.body.userId,
			});

			const response = await api.delete(`/solicitation/${soli.body.id}`);

			expect(response.status).toBe(401);
			expect(response.body).toEqual({ error: 'token is necessary' });
		});

		test('it should not delete if user not exist', async () => {
			await createUser(api);
			await createUser(api, { isPhone: true });

			const User01 = await createLogin(api);
			const User02 = await createLogin(api, { isPhone: true });

			const soli = await createSolicitation(api, {
				withToken: true,
				token: User01.body.token,
				toUser: User02.body.userId,
			});

			const response = await api
				.delete(`/solicitation/${soli.body.id}`)
				.set('authorization', `Bearer ${createToken()}`);

			expect(response.status).toBe(400);
			expect(response.body).toEqual({ error: 'this user not exist' });
		});

		test('it should not delete if solicitation not exist', async () => {
			await createUser(api);

			const User = await createLogin(api);

			const response = await api
				.delete(`/solicitation/${v4()}`)
				.set('authorization', `Bearer ${User.body.token}`);

			expect(response.status).toBe(400);
			expect(response.body).toEqual({ error: 'this solicitation not exist' });
		});

		test('it should not delete if the user not was owner or recipient', async () => {
			await createUser(api);
			await createUser(api, { isPhone: true });
			await createUser(api, { initialData: { email: 'email@email.com' } });

			const User01 = await createLogin(api);
			const User02 = await createLogin(api, { isPhone: true });
			const User03 = await createLogin(api, { initialData: { email: 'email@email.com' } });

			const soli = await createSolicitation(api, {
				withToken: true,
				token: User01.body.token,
				toUser: User02.body.userId,
			});

			const response = await api
				.delete(`/solicitation/${soli.body.id}`)
				.set('authorization', `Bearer ${User03.body.token}`);

			expect(response.status).toBe(401);
			expect(response.body).toEqual({ error: 'you not have permission for to follow' });
		});

		test('it should delete', async () => {
			await createUser(api);
			await createUser(api, { isPhone: true });

			const User01 = await createLogin(api);
			const User02 = await createLogin(api, { isPhone: true });

			const soli = await createSolicitation(api, {
				withToken: true,
				token: User01.body.token,
				toUser: User02.body.userId,
			});

			const response = await api
				.delete(`/solicitation/${soli.body.id}`)
				.set('authorization', `Bearer ${User01.body.token}`);

			expect(response.status).toBe(200);
			expect(response.body).toEqual({});
		});
	});
});
