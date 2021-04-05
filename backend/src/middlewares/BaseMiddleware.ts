import { Request } from 'express';
import { getRepository } from 'typeorm';

import jwt from 'jsonwebtoken';

import UserModel from '../database/models/User';
import PostModel from '../database/models/Posts';

class BaseMiddleware {
   async checkTokenInfo(req: Request) {
      const { authorization } = req.headers;

      if (!authorization) {
         throw Error('token is necessary');
      }

      const [, token] = authorization.split(' ');

      if (!token) {
         throw Error('token is necessary');
      }

      const tokenIsValid = jwt.verify(token, String(process.env.JWTSECRETPHASE)) as {
         id: string;
         office: string;
      };
      const { id, office } = tokenIsValid;

      const user = await this.getUserById(id);
      if (!user) {
         throw Error('user not exist');
      }

      return { id, office };
   }

   async getUser(email: string | undefined, phone: string | undefined) {
      const Repository = getRepository(UserModel);

      const User = await Repository.find({
         ...(email && { email }),
         ...(phone && { phone }),
      });

      return User[0];
   }

   async getUserById(id: string) {
      const Repository = getRepository(UserModel);

      const User = await Repository.find({ id });

      return User[0];
   }

   async getPost(id: string) {
      const Repository = getRepository(PostModel);

      const Post = await Repository.find({ where: { id }, relations: ['user'] });

      return Post[0];
   }
}

export default new BaseMiddleware();
