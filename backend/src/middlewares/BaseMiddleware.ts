import { Request } from 'express';
import jwt from 'jsonwebtoken';

import { prisma } from '../database/connection';

class BaseMiddleware {
   async checkTokenInfo(req: Request) {
      const { authorization } = req.headers;
      if (!authorization) throw Error('token is necessary');

      const [, token] = authorization.split(' ');
      if (!token) throw Error('token is necessary');

      const tokenIsValid = jwt.verify(token, String(process.env.JWTSECRETPHASE)) as {
         id: string;
         office: string;
      };
      const { id, office } = tokenIsValid;

      const user = await this.getUserById(id);
      if (!user) throw Error('user not exist');

      return { id, office };
   }

   async getUser(email: string | undefined, phone: string | undefined) {
      const User = await prisma.user.findFirst({
         where: {
            ...(email && { email }),
            ...(phone && { phone }),
         },
      });

      return User;
   }

   async getUserById(id: string) {
      const User = await prisma.user.findUnique({ where: { id } });

      return User;
   }

   async getPost(id: string) {
      const Post = await prisma.post.findUnique({
         where: { id },
         include: {
            user: true,
         },
      });

      return Post;
   }
}

export default new BaseMiddleware();
