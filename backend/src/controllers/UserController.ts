import { Request, Response } from 'express';

import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

import { prisma } from '../database/connection';

import UserView from '../views/UserView';

const isTest = process.env.NODE_ENV === 'test';

class UserController {
   async listAll(req: Request, res: Response) {
      const users = await prisma.user.findMany({
         include: {
            avatars: true,
         },
      });

      return res.status(200).json(UserView.renderMultiplyUser(users));
   }

   async list(req: Request, res: Response) {
      const User = await prisma.user.findUnique({
         where: {
            id: req.params.id,
         },
         include: {
            avatars: true,
         },
      });

      return res.status(200).json(isTest ? User : UserView.renderSingleUser(User));
   }

   async create(req: Request, res: Response) {
      const {
         firstname,
         lastname,
         email,
         phone,
         password,
         sex,
         pronoun,
         date_birth,
      } = req.body as { [key: string]: string };
      if (email && phone) throw Error('data invalid');

      const hash = await bcrypt.hash(password, 10);

      const office =
         process.env.NODE_ENV === 'test' && phone && phone === '5588888888'
            ? 'Administrator'
            : 'User';

      await prisma.user.create({
         data: {
            id: v4(),
            firstname,
            lastname,
            ...(email && { email }),
            ...(phone && { phone }),
            password: hash,
            sex,
            pronoun,
            office,
            date_birth: dayjs(date_birth).format(),
            online: false,
            createdAt: dayjs().format(),
            updatedAt: '',
            theme: 'light',
         },
      });

      return res.status(201).send();
   }

   async login(req: Request, res: Response) {
      const { email, phone, password } = req.body as { [key: string]: string };
      if ((!email && !phone) || (email && phone) || !password) {
         throw Error('data invalid');
      }

      const User = await prisma.user.findFirst({
         where: {
            ...(email ? { email } : { phone }),
         },
      });
      if (!User) throw Error('user not exist');

      const passwordisValid = await bcrypt.compare(password, User.password);
      if (!passwordisValid) throw Error('password not valid');

      const secret = String(process.env.JWTSECRETPHASE);
      const token = jwt.sign({ id: User.id, office: User.office }, secret, {
         expiresIn: '999d',
      });

      return res.status(200).json({ token, userId: User.id });
   }

   async update(req: Request, res: Response) {
      const User = await prisma.user.findUnique({ where: { id: req.params.id } });
      if (!User) throw Error('user not exist');

      const { userId, password, ...rest } = req.body;

      await prisma.user.update({
         where: { id: req.params.id },
         data: {
            ...rest,
            ...(password && {
               password: await bcrypt.hash(req.body.password, 10),
            }),
         },
      });

      return res.status(200).send();
   }

   async delete(req: Request, res: Response) {
      await prisma.user.delete({ where: { id: req.params.id } });

      return res.status(200).send();
   }
}

export default new UserController();
