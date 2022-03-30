import { describe, test, expect, beforeEach } from '@jest/globals';
import request from 'supertest';

import { v4 } from 'uuid';
import dayjs from 'dayjs';

import app from '../src/app';

import { getUser, createUser, createLogin } from './utils/functions/User';
import defaultValues from './utils/values/User';

import { createToken } from './utils/functions/Token';

import { clear } from './utils/database';

const api = request(app);

const {
	admUser,
	newEmail,
	defaultFirstname,
	defaultLastname,
	defaultEmail,
	defaultPhone,
} = defaultValues;

describe('Testing all functionality of user', () => {
	beforeEach(async () => await clear());

	describe('Get data of user', () => {
		test('it should not return the data for others users', async () => {
			await createUser(api);
			await createUser(api, { isPhone: true });

			const user1 = await createLogin(api);
			const user2 = await createLogin(api, { isPhone: true });

			const response = await getUser(api, {
				isPhone: false,
				initialData: {
					userId: user1.body.userId,
					token: user2.body.token,
				},
			});

			expect(response.status).toBe(401);
			expect(response.body).toEqual({ error: 'you not have permission for to follow' });
		});

		test('it should not get data of user if not exist', async () => {
			const id = v4();

			const response = await getUser(api, {
				isPhone: false,
				initialData: { userId: id, token: createToken(id) },
			});

			expect(response.status).toBe(400);
			expect(response.body).toEqual({ error: 'this user not exist' });
		});

		test('it should not return the data without sent token', async () => {
			await createUser(api);

			const user = await createLogin(api);

			const response = await api.get(`/user/${user.body.userId}`);

			expect(response.status).toBe(401);
			expect(response.body).toEqual({ error: 'token is necessary' });
		});

		test('it should not return the data without userId valid', async () => {
			await createUser(api);

			const response = await getUser(api, {
				isPhone: false,
				initialData: { userId: '123456' },
			});

			expect(response.status).toBe(400);
			expect(response.body).toEqual({ error: 'this id is not valid' });
		});

		test('it should return the data of user', async () => {
			await createUser(api);

			const response = await getUser(api);

			expect(response.status).toBe(200);
			expect(response.body).toMatchObject(
				expect.objectContaining({
					firstname: defaultFirstname,
					lastname: defaultLastname,
					email: defaultEmail,
				})
			);
		});

		test('it should return the data of user with token of administrator', async () => {
			await createUser(api);
			await createUser(api, { isPhone: true, initialData: { phone: admUser } });

			const adm = await createLogin(api, {
				isPhone: true,
				initialData: { phone: admUser },
			});

			const response = await getUser(api, {
				isPhone: false,
				initialData: { token: adm.body.token },
			});

			expect(response.status).toBe(200);
			expect(response.body).toMatchObject(
				expect.objectContaining({
					firstname: defaultFirstname,
					lastname: defaultLastname,
					email: defaultEmail,
				})
			);
		});
	});

	describe('Creating user', () => {
		test('it should not creating user with invalid data', async () => {
			const response = await api.post('/register');

			expect(response.status).toBe(400);
			expect(response.body).toEqual({ error: 'this data is not valid' });
		});

		test('it should not creating user with data difference', async () => {
			const response = await api.post('/register').send({
				data1: 'data1',
				data2: 'data2',
				data3: 'data3',
				data4: 'data4',
				data5: 'data5',
				data6: 'data6',
				data7: 'data7',
			});

			expect(response.status).toBe(400);
			expect(response.body).toEqual({ error: 'this data is not valid' });
		});

		test('it should not creating user with email and phone in first step', async () => {
			const response = await createUser(api, {
				isPhone: false,
				initialData: { phone: '5500000000' },
			});

			expect(response.status).toBe(400);
			expect(response.body).toEqual({ error: 'this data is not valid' });
		});

		test('it should not creating user with same data', async () => {
			const userEmailFirst = await createUser(api);
			const userEmailTwo = await createUser(api);

			const userPhoneFirst = await createUser(api, { isPhone: true });
			const userPhoneTwo = await createUser(api, { isPhone: true });

			expect(userEmailFirst.status).toBe(201);
			expect(userEmailFirst.body).toEqual({});

			expect(userEmailTwo.status).toBe(401);
			expect(userEmailTwo.body).toEqual({ error: 'this email already in use' });

			expect(userPhoneFirst.status).toBe(201);
			expect(userPhoneFirst.body).toEqual({});

			expect(userPhoneTwo.status).toBe(401);
			expect(userPhoneTwo.body).toEqual({ error: 'this phone already in use' });
		});

		test('it should creating user with valid data', async () => {
			const userEmail = await createUser(api);
			const userPhone = await createUser(api, { isPhone: true });

			expect(userEmail.status).toBe(201);
			expect(userEmail.body).toEqual({});

			expect(userPhone.status).toBe(201);
			expect(userPhone.body).toEqual({});
		});
	});

	describe('Authentication of user', () => {
		test('it should not autheticate user with email and phone', async () => {
			await createUser(api);

			const user = await createLogin(api, {
				isPhone: false,
				initialData: { phone: defaultPhone },
			});

			expect(user.status).toBe(400);
			expect(user.body).toEqual({ error: 'this data is not valid' });
		});

		test('it should not autheticate user with password not valid', async () => {
			await createUser(api);
			await createUser(api, { isPhone: true });

			const user1 = await createLogin(api, {
				isPhone: false,
				initialData: { password: '654321' },
			});
			const user2 = await createLogin(api, {
				isPhone: true,
				initialData: { password: '654321' },
			});

			expect(user1.status).toBe(400);
			expect(user1.body).toEqual({ error: 'this password not is valid' });

			expect(user2.status).toBe(400);
			expect(user2.body).toEqual({ error: 'this password not is valid' });
		});

		test('it should not authenticate user not existing', async () => {
			const user1 = await createLogin(api);
			const user2 = await createLogin(api, { isPhone: true });

			expect(user1.status).toBe(400);
			expect(user1.body).toEqual({ error: 'this user not exist' });

			expect(user2.status).toBe(400);
			expect(user2.body).toEqual({ error: 'this user not exist' });
		});

		test('it should authenticate user', async () => {
			await createUser(api);
			await createUser(api, { isPhone: true });

			const user1 = await createLogin(api);
			const user2 = await createLogin(api, { isPhone: true });

			expect(user1.status).toBe(200);
			expect(user1.body).toHaveProperty('token');
			expect(user1.body).toHaveProperty('userId');

			expect(user2.status).toBe(200);
			expect(user2.body).toHaveProperty('token');
			expect(user2.body).toHaveProperty('userId');
		});
	});

	describe('Update data of user', () => {
		test('it should not any user make a update in others users', async () => {
			await createUser(api);
			await createUser(api, { isPhone: true });

			const user1 = await createLogin(api);
			const user2 = await createLogin(api, { isPhone: true });

			const updateUser1 = await api
				.put(`/user/${user1.body.userId}`)
				.set('authorization', `Bearer ${user2.body.token}`)
				.send({
					firstname: defaultFirstname,
					lastname: defaultLastname,
				});

			expect(updateUser1.status).toBe(401);
			expect(updateUser1.body).toEqual({ error: 'you not have permission for to follow' });
		});

		test('it should not update user without data', async () => {
			await createUser(api);

			const user1 = await createLogin(api);

			const updateUser1 = await api
				.put(`/user/${user1.body.userId}`)
				.set('authorization', `Bearer ${user1.body.token}`);

			expect(updateUser1.status).toBe(400);
			expect(updateUser1.body).toEqual({ error: 'this data is not valid' });
		});

		test('it should not update user without sent token', async () => {
			await createUser(api);

			const user1 = await createLogin(api);

			const response = await api.put(`/user/${user1.body.userId}`).send({
				firstname: defaultFirstname,
				lastname: defaultLastname,
				email: newEmail,
			});

			expect(response.status).toBe(401);
			expect(response.body).toEqual({ error: 'token is necessary' });
		});

		test('it should not update user with data invalid', async () => {
			await createUser(api);

			const user1 = await createLogin(api);

			const response = await api
				.put(`/user/${user1.body.userId}`)
				.set('authorization', `Bearer ${user1.body.token}`)
				.send({
					office: 'qualquery',
					latestname: defaultLastname,
					email: newEmail,
				});

			const userUpdated = await getUser(api, {
				isPhone: false,
				initialData: { userId: user1.body.userId, token: user1.body.token },
			});

			expect(response.status).toBe(200);
			expect(response.body).toEqual({});

			expect(userUpdated.body).toMatchObject(
				expect.objectContaining({
					email: newEmail,
					office: 'User',
				})
			);
		});

		test('it should update data of user', async () => {
			await createUser(api);

			const user = await createLogin(api);

			const response = await api
				.put(`/user/${user.body.userId}`)
				.set('authorization', `Bearer ${user.body.token}`)
				.send({
					firstname: defaultFirstname,
					lastname: defaultLastname,
					email: newEmail,
					sex: 'Female',
					pronoun: 'Female',
					password: 'teste',
					date_birth: dayjs(new Date(2004, 5, 2)).format(),
				});

			const userUpdated = await createLogin(api, {
				isPhone: false,
				initialData: {
					email: newEmail,
					password: 'teste',
				},
			});

			const updatedUser = await getUser(api, {
				isPhone: false,
				initialData: { userId: user.body.userId, token: user.body.token },
			});

			expect(response.status).toBe(200);
			expect(response.body).toEqual({});

			expect(userUpdated.status).toBe(200);
			expect(userUpdated.body).toHaveProperty('token');
			expect(userUpdated.body).toHaveProperty('userId');

			expect(updatedUser.status).toBe(200);
			expect(updatedUser.body).toMatchObject(
				expect.objectContaining({
					firstname: defaultFirstname,
					lastname: defaultLastname,
					email: newEmail,
					sex: 'Female',
					pronoun: 'Female',
				})
			);
		});

		test('it should update data of user with token of administrator', async () => {
			await createUser(api);
			await createUser(api, { isPhone: true, initialData: { phone: admUser } });

			const user = await createLogin(api);
			const userAdm = await createLogin(api, {
				isPhone: true,
				initialData: { phone: admUser },
			});

			const response = await api
				.put(`/user/${user.body.userId}`)
				.set('authorization', `Bearer ${userAdm.body.token}`)
				.send({
					firstname: defaultFirstname,
					lastname: defaultLastname,
					email: newEmail,
					sex: 'Female',
					pronoun: 'Female',
					password: 'teste',
					date_birth: dayjs(new Date(2004, 5, 2)).format(),
				});

			const updatedUser = await getUser(api, {
				isPhone: false,
				initialData: { userId: user.body.userId, token: user.body.token },
			});

			expect(response.status).toBe(200);
			expect(response.body).toEqual({});

			expect(updatedUser.status).toBe(200);
			expect(updatedUser.body).toMatchObject(
				expect.objectContaining({
					firstname: defaultFirstname,
					lastname: defaultLastname,
					email: newEmail,
					sex: 'Female',
					pronoun: 'Female',
				})
			);
		});
	});

	describe('Deleting user', () => {
		test('it should not deleting user without token', async () => {
			await createUser(api);

			const User = await createLogin(api);

			const response = await api.delete(`/user/${User.body.userId}`);

			expect(response.status).toBe(401);
			expect(response.body).toEqual({ error: 'token is necessary' });
		});

		test('it should not deleting user with token of other user', async () => {
			await createUser(api);
			await createUser(api, { isPhone: true });

			const UserOne = await createLogin(api);
			const UserTwo = await createLogin(api, { isPhone: true });

			const response = await api
				.delete(`/user/${UserOne.body.userId}`)
				.set('authorization', `Bearer ${UserTwo.body.token}`);

			expect(response.status).toBe(401);
			expect(response.body).toEqual({ error: 'you not have permission for to follow' });
		});

		test('it should deleting user', async () => {
			await createUser(api);

			const User = await createLogin(api);
			const response = await api
				.delete(`/user/${User.body.userId}`)
				.set('authorization', `Bearer ${User.body.token}`);

			expect(response.status).toBe(200);
			expect(response.body).toEqual({});
		});
	});
});
