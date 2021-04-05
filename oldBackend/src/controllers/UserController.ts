import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import dayjs from 'dayjs';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../database/models/User';
import UserView from '../views/UserView';

import { RequestCreateProps, RequestLoginProps } from '../utils/interfaces';

const relations = ['avatars'];

class UserController {
	async ListAll(req: Request, res: Response) {
		const Repository = getRepository(UserModel);

		const Users = await Repository.find({ relations });

		return res.status(200).json({ Users: UserView.RenderMultipleUser(Users) });
	}

	async ListOne(req: Request, res: Response) {
		const Repository = getRepository(UserModel);

		const { id } = req.params;
		if (!id) throw Error('sem id');

		const User = await Repository.findOne(id, { relations });
		if (!User) throw Error('user inexistente');

		return res.status(200).json({ User: UserView.RenderSingleUser(User) });
	}

	async ListUserWithToken(req: Request, res: Response) {
		const Repository = getRepository(UserModel);

		const { userId } = req.body;
		if (!userId) throw Error('sem userId');

		const User = await Repository.findOne(userId, { relations });
		if (!User) throw Error('user inexistente');

		return res.status(200).json({ User: UserView.RenderSingleUser(User) });
	}

	async Create(req: Request, res: Response) {
		const Repository = getRepository(UserModel);
		const {
			firstname,
			lastname,
			phone,
			email,
			password,
			sex,
			pronoun,
			date_birth,
		}: RequestCreateProps = req.body;

		if (!firstname || !lastname || !password || !sex || !date_birth || !pronoun) throw Error('Dados invalidos');
		if (!phone && !email) throw Error('Dados invalidos');

		if (email) {
			const FindEmail = await Repository.findOne({ email });

			if (FindEmail) throw Error('email existente');
		}

		if (phone) {
			const FindTelefone = await Repository.findOne({ phone });

			if (FindTelefone) throw Error('telefone existente');
		}

		const DateFormated = dayjs(date_birth).format();
      const passwordEncrypted = bcrypt.hashSync(password, 10);

		const User = Repository.create({
         firstname,
			lastname,
         completeName: `${firstname} ${lastname}`,
			...(phone && { phone }),
			...(email && { email }),
			password: passwordEncrypted,
			sex,
			pronoun,
			online: 0,
			theme: 'light',
			date_birth: DateFormated,
			office: 'Usuário',
			updatedAt: '',
		});

		await Repository.save(User);

		const token = jwt.sign(
			{
				id: User.id,
				cargo: User.office,
			},
			'qualquercoisaquesejasecreto',
			{ expiresIn: '99999999d' }
		);

		return res.status(201).json({ token: token });
	}

	async Login(req: Request, res: Response) {
		const Repository = getRepository(UserModel);

		const { email, phone, password }: RequestLoginProps = req.body;
		if ((!email && !phone) || !password) throw Error('Dados invalidos');

		const User = email
			? await Repository.findOne({ email }, { relations })
			: await Repository.findOne({ phone }, { relations });

		if (!User) throw Error('user inexistente');

		const isValid = await bcrypt.compare(password, User.password);
		if (!isValid) throw Error('senha invalida');

		const token = jwt.sign(
			{
				id: User.id,
				cargo: User.office,
			},
			'qualquercoisaquesejasecreto',
			{ expiresIn: '99999999d' }
		);

		return res.status(200).json(UserView.RenderSingleUser(User, token));
	}

	async Update(req: Request, res: Response) {
		const Repository = getRepository(UserModel);
		const {
         firstname,
			lastname,
			phone,
			email,
			password,
			sex,
			date_birth,
         theme,
			online,
		} = req.body;

		const User = await Repository.findOne(req.params.id);
		if (!User) throw Error('user inexistente');

		const DateFormated = dayjs(date_birth).utc().format('LL');
      const passwordEncrypted = password ? bcrypt.hashSync(password, 10) : '';

		firstname && (User.firstname = firstname);
		lastname && (User.lastname = lastname);
		phone && (User.phone = phone);
		sex && (User.sex = sex);
		email && (User.email = email);
		password && (User.password = passwordEncrypted);
		online && (User.online = online);
		theme && (User.theme = theme);
		DateFormated && (User.date_birth = DateFormated);

		await Repository.save(User);

		return res.status(200).send();
	}

	async Delete(req: Request, res: Response) {
		const Repository = getRepository(UserModel);
		const { id } = req.params;

		await Repository.delete(id);

		return res.status(200).send();
	}
}

export default new UserController();
