import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../database/models/User';
import UserView from '../views/UserView';

const isTest = process.env.NODE_ENV === 'test';

class UserController {
   async list(req: Request, res: Response) {
      const Repository = getRepository(UserModel);

      const User = await Repository.findOne(req.params.id);

      return res.status(200).json(isTest ? User : UserView.renderSingleUser(User));
   }

   async create(req: Request, res: Response) {
      const Repository = getRepository(UserModel);

      const {
         firstname,
         lastname,
         email,
         phone,
         password,
         sex,
         pronoun,
         date_birth,
      } = req.body;

      const hash = await bcrypt.hash(password, 10);

      const User = Repository.create({
         firstname,
         lastname,
         ...(email && { email }),
         ...(phone && { phone }),
         password: hash,
         sex,
         pronoun,
         date_birth: dayjs(date_birth).format(),
      });

      await Repository.save(User);

      return res.status(201).send();
   }

   async login(req: Request, res: Response) {
      const Repository = getRepository(UserModel);

      const { email, phone, password } = req.body;

      if ((!email && !phone) || (email && phone) || !password) {
         throw Error('data invalid');
      }

      const User = await Repository.findOne({ ...(email ? { email } : { phone }) });
      if (!User) {
         throw Error('user not exist');
      }

      const passwordisValid = await bcrypt.compare(password, User.password);
      if (!passwordisValid) {
         throw Error('password not valid');
      }

      const secret = String(process.env.JWTSECRETPHASE);

      const token = jwt.sign({ id: User.id, office: User.office }, secret, {
         expiresIn: '999d',
      });

      return res.status(200).json({ token, userId: User.id });
   }

   async update(req: Request, res: Response) {
      const Repository = getRepository(UserModel);

      let User = await Repository.findOne(req.params.id);
      if (!User) throw Error('user not exist');

      const updateUser = { ...User } as any;

      if (req.body.password) {
         req.body.password = await bcrypt.hash(req.body.password, 10);
      }

      Object.entries(req.body).map(async item => {
         const existProperty = updateUser[item[0]];

         if (existProperty) {
            updateUser[item[0]] = item[1];
         }
      });

      await Repository.save(updateUser);

      return res.status(200).send();
   }

   async delete(req: Request, res: Response) {
      const Repository = getRepository(UserModel);

      await Repository.delete(req.params.id);

      return res.status(200).send();
   }
}

export default new UserController();
